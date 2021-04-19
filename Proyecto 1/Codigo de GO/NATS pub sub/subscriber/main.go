package main

import (
	"flag"
	"log"
	"net/http"
	"runtime"
	"strings"

	"github.com/nats-io/nats.go"
)

func printMsg(m *nats.Msg, i int) {
	log.Printf("[#%d] Received on [%s]: '%s'", i, m.Subject, string(m.Data))
}

func main() {
	var urls = flag.String("s", "nats://natsserver:4222", "The nats server URLs (separated by comma)")
	var showTime = flag.Bool("t", false, "Display timestamps")

	// Connect Options.
	opts := []nats.Option{nats.Name("NATS Sample Subscriber")}

	// Connect to NATS
	nc, err := nats.Connect(*urls, opts...)
	if err != nil {
		log.Fatal(err)
	}

	subj, i := "NATS", 0

	nc.Subscribe(subj, func(msg *nats.Msg) {
		i += 1
		printMsg(msg, i)
		sendpost(string(msg.Data))
	})
	nc.Flush()

	if err := nc.LastError(); err != nil {
		log.Fatal(err)
	}

	log.Printf("Listening on [%s]", subj)
	if *showTime {
		log.SetFlags(log.LstdFlags)
	}

	runtime.Goexit()
}

func sendpost(value string) {
	val := strings.Split(value, "}")[0]
	var sb strings.Builder
	sb.WriteString(string(val))
	sb.WriteString(", \"tipo\":\"NATS\" }")

	requestBody := strings.NewReader(sb.String())
	_, err := http.Post("http://35.193.161.136:3000", "application/json; charset=UTF-8", requestBody)
	if err != nil {
		log.Printf("Enviado")
	} else {
		log.Printf("NO Enviado")
	}
}
