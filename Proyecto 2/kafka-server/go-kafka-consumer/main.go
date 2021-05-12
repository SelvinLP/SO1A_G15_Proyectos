package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"
    //"encoding/json"
	kafka "github.com/segmentio/kafka-go"
)


func getKafkaReader(kafkaURL, topic, groupID string) *kafka.Reader {
	return kafka.NewReader(kafka.ReaderConfig{
		Brokers:  []string{kafkaURL},
		GroupID:  groupID,
		Topic:    topic,
		MinBytes: 10e3, // 10KB
		MaxBytes: 10e6, // 10MB
	})
}

func main() {
	// get kafka reader using environment variables.
	kafkaURL := "localhost:9092"//my-cluster-kafka-bootstrap
	topic := "prueba"
	groupID := "0"
	reader := getKafkaReader(kafkaURL, topic, groupID)

	defer reader.Close()

	fmt.Println("start consuming ... !!")
	
	for {
		m, err := reader.ReadMessage(context.Background())
		if err != nil {
			log.Fatalln(err)
		}
		fmt.Printf(string(m.Value))
		requestBody := strings.NewReader(string(m.Value))
		_, err = http.Post("http://34.72.16.244:3000/", "application/json; charset=UTF-8", requestBody)
		if err == nil {
			log.Printf("Enviado")
		} else {
			log.Printf("NO Enviado")
		}
		if err != nil {
			log.Fatal(err)
		}
	}
}
