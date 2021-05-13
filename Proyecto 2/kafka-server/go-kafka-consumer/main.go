package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strings"
    //"encoding/json"
    "github.com/garyburd/redigo/redis"
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
	kafkaURL := "my-cluster-kafka-bootstrap:9092"//my-cluster-kafka-bootstrap
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
		//Arrego JSON
		fmt.Printf(string(m.Value))
		val := strings.Split(string(m.Value), "}")[0]
		var sb strings.Builder
		sb.WriteString(string(val))
		sb.WriteString(", \"tipo\":\"KAFKA\" }")

		requestBody := strings.NewReader(sb.String())
		//mongodb
		_, err = http.Post("http://34.72.16.244:3000/", "application/json; charset=UTF-8", requestBody)
		if err == nil {
			log.Printf("Enviado")
		} else {
			log.Printf("NO Enviado")
		}
		if err != nil {
			log.Fatal(err)
		}
		// REDIS
		conn2, err := redis.Dial("tcp",
		"redis-18733.c1.us-central1-2.gce.cloud.redislabs.com:18733",
		redis.DialPassword("sopes12021"))
		//PARTE DE REDIS
		if err != nil {
			log.Fatal(err)
		}
		info := sb.String() +","
		if _, err = conn2.Do("APPEND", "foo", info); err != nil {
			log.Fatal(err)
		}
	}
}
