package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"github.com/gorilla/mux"
	kafka "github.com/segmentio/kafka-go"
)

func producerHandler(kafkaWriter *kafka.Writer) func(http.ResponseWriter, *http.Request) {
	return http.HandlerFunc(func(wrt http.ResponseWriter, req *http.Request) {
		body, err := ioutil.ReadAll(req.Body)
		if err != nil {
			log.Fatalln(err)
		}
		msg := kafka.Message{
			Key:   []byte(fmt.Sprintf("address-%s", req.RemoteAddr)),
			Value: body,
		}
		err = kafkaWriter.WriteMessages(req.Context(), msg)

		if err != nil {
			wrt.Write([]byte(err.Error()))
			log.Fatalln(err)
		}
		wrt.WriteHeader(http.StatusOK)
    		wrt.Header().Set("Content-Type", "application/json")
    		wrt.Write([]byte(`{"message":"Llego mensaje"}`))
	})
}

func getKafkaWriter(kafkaURL, topic string) *kafka.Writer {
	return &kafka.Writer{
		Addr:     kafka.TCP(kafkaURL),
		Topic:    topic,
		Balancer: &kafka.LeastBytes{},
	}
}

func homePage(w http.ResponseWriter, r *http.Request){
    w.WriteHeader(http.StatusOK)
    w.Header().Set("Content-Type", "application/json")
    w.Write([]byte(`{"message":"Hola Servidor KAFKA PRODUCER}`))
    fmt.Println("get Inicio")
}


func main() {
	// get kafka writer using environment variables.
	kafkaURL := "localhost:9092"//my-cluster-kafka-bootstrap
	topic := "prueba"
	kafkaWriter := getKafkaWriter(kafkaURL, topic)

	defer kafkaWriter.Close()

	myRouter := mux.NewRouter().StrictSlash(true)

	// Add handle func for producer.
	myRouter.HandleFunc("/", producerHandler(kafkaWriter)).Methods("POST")
	myRouter.HandleFunc("/", homePage)
	
	


	// Run the web server.
	fmt.Println("start producer-api ... !!")
	log.Fatal(http.ListenAndServe(":8080", myRouter))
}
