package main

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"google.golang.org/grpc"
	pb "google.golang.org/grpc/examples/helloworld/helloworld"
)

const (
	address = "servidor:9000"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

func newElement(w http.ResponseWriter, r *http.Request) {
	// Adding headers
	w.Header().Set("Content-Type", "application/json")
	if r.Method == "GET" {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("{\"message\": \"ok gRPC\"}"))
		return
	}

	// Parsing body
	var body map[string]interface{}
	err := json.NewDecoder(r.Body).Decode(&body)
	failOnError(err, "Parsing JSON")
	body["tipo"] = "GRPC"
	data, err := json.Marshal(body)

	// Server Connection
	conn, err := grpc.Dial(address, grpc.WithInsecure(), grpc.WithBlock())
	failOnError(err, "GRPC Connection")
	defer conn.Close()

	// Adding new client
	cli := pb.NewGreeterClient(conn)
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()

	// Sending data
	re, err := cli.SayHello(ctx, &pb.HelloRequest{Name: string(data)})
	failOnError(err, "Error al enviar el mensaje")
	log.Print("Sent: " + string(data))
	log.Printf("Server gRPC Response : %s", re.GetMessage())

	// Setting status and send response
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(re.GetMessage()))
}

func handleRequests() {
	println("Servidor cliente levantado en el puerto 3000")
	http.HandleFunc("/", newElement)
	log.Fatal(http.ListenAndServe(":3000", nil))
}

func main() {
	handleRequests()
}
