package main

import (
    "fmt"
    "log"
    "flag"
    "net/http"
    "io/ioutil"
    "github.com/gorilla/mux"
    "github.com/nats-io/nats.go"
)
var urls = flag.String("s", "nats://natsserver:4222", "The nats server URLs (separated by comma)")
var reply = flag.String("reply", "", "Sets a specific reply subject")

// Existing code from above
func handleRequests() {
    // creates a new instance of a mux router
    myRouter := mux.NewRouter().StrictSlash(true)
    
    //crea las rutas
    myRouter.HandleFunc("/", PostUsuario).Methods("POST")
    myRouter.HandleFunc("/", homePage)
    
    //Espera a la escucha
    log.Fatal(http.ListenAndServe(":3000", myRouter))
}

func main() {
    fmt.Println("Server NATS")
    handleRequests()
}

func homePage(w http.ResponseWriter, r *http.Request){
    w.WriteHeader(http.StatusOK)
    w.Header().Set("Content-Type", "application/json")
    w.Write([]byte(`{"message":"Hola Servidor Nats publisher"}`))
    fmt.Println("get Inicio")
}

func PostUsuario(w http.ResponseWriter, r *http.Request) {
    // get the body of our POST request
    // return the string response containing the request body    
    reqBody, _ := ioutil.ReadAll(r.Body)
    fmt.Println("post METOD")
    
    //metodo nats publisher
    NatsPublisherMethod(string(reqBody))
    w.Header().Set("Content-Type", "application/json")
    w.Write([]byte(`{"message":"POST HECHO"}`))
}

func usage() {
	log.Printf("Usage: nats-pub [-s server] [-creds file] <subject> <msg>\n")
	flag.PrintDefaults()
}

func NatsPublisherMethod(value string){


	// Connect Options.
	opts := []nats.Option{nats.Name("NATS Sample Publisher")}


	// Connect to NATS
	nc, err := nats.Connect(*urls, opts...)
	if err != nil {
		log.Fatal(err)
	}
	defer nc.Close()

	subj, msg := "NATS", []byte(value)

	if reply != nil && *reply != "" {
		nc.PublishRequest(subj, *reply, msg)
	} else {
		nc.Publish(subj, msg)
	}

	nc.Flush()

	if err := nc.LastError(); err != nil {
		log.Fatal(err)
	} else {
		log.Printf("Published [%s] : '%s'\n", subj, msg)
	}
}



