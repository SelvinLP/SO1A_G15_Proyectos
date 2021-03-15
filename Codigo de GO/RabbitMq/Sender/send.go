package main

import (
	"log"

	"encoding/json"
	"net/http"

	"github.com/streadway/amqp"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func newElement(w http.ResponseWriter, r *http.Request) {
	// Headers
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "GET" {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("{\"message\": \"ok\"}"))
		return
	}

	// body
	var body map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&body)
	failOnError(err, "Parsing JSON")
	data, err := json.Marshal(body)

	// conección al servidor
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	failOnError(err, "Failed to connect to RabbitMQ")
	defer conn.Close()

	// Channel
	ch, err := conn.Channel()
	failOnError(err, "Failed to open a channel")
	defer ch.Close()

	// New Queue
	q, err := ch.QueueDeclare(
		"hello", //name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)
	failOnError(err, "Failed to declare a queue")

	// Publicando mensaje
	newData := string(data)
	err = ch.Publish(
		"",     // exchange
		q.Name, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(newData),
		})
	failOnError(err, "Failed to publish a message")
	log.Printf(" [x] Sent %s", newData)

	// Setting status and send response
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(newData))
}

func hadleRequests() {
	http.HandleFunc("/", newElement)
	log.Fatal(http.ListenAndServe(":3000", nil))
}

func main() {
	hadleRequests()
}
