package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"
	"sync"

	"cloud.google.com/go/pubsub"
)

func pullMsgs() error {
	projectID := "sopes1-307323"
	subID := "msg_sopes1"
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
	var mu sync.Mutex
	received := 0
	sub := client.Subscription(subID)
	cctx, cancel := context.WithCancel(ctx)
	err = sub.Receive(cctx, func(ctx context.Context, msg *pubsub.Message) {
		mu.Lock()
		defer mu.Unlock()
		sendpost(string(msg.Data))
		msg.Ack()
		received++
		if received == 10000 {
			cancel()
		}
	})
	if err != nil {
		return fmt.Errorf("Receive: %v", err)
	}
	return nil
}

func main() {
	fmt.Println("Let's start ...")
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
		print(sb.String())
	} else {
		log.Printf("NO Enviado")
	}
}
