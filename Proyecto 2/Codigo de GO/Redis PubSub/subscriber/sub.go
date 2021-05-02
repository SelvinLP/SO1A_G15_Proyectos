package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"cloud.google.com/go/pubsub"
)

func pullMsgs() error {
	projectID := "proyecto2sopes-311923"
	subID := "suscriptor_so1"
	os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", "llave.json")
	ctx := context.Background()
	//Creacion del cliente
	client, err := pubsub.NewClient(ctx, projectID)
	if err != nil {
		fmt.Println("Error al crear el cliente")
		fmt.Println("pubsub.NewClient: %v", err)
		return err
	}

	// Consume 10000 messages.
	sub := client.Subscription(subID)
	err = sub.Receive(ctx, func(ctx context.Context, msg *pubsub.Message) {
		sendpost(string(msg.Data))
		msg.Ack()
	})
	if err != nil {
		return fmt.Errorf("Receive: %v", err)
	}
	return nil
}

func main() {
	fmt.Println("Iniciando Subscriber")
	pullMsgs()
	fmt.Println("Finalizado")
}

func sendpost(value string) {
	val := strings.Split(value, "}")[0]
	var sb strings.Builder
	sb.WriteString(string(val))
	sb.WriteString(", \"tipo\":\"Pub Sub\" }")

	requestBody := strings.NewReader(sb.String())
	_, err := http.Post("http://35.193.161.136:3000", "application/json; charset=UTF-8", requestBody)
	if err != nil {
		log.Printf("Enviado Correctamente")
	} else {
		log.Printf("NO Enviado")
	}
}
