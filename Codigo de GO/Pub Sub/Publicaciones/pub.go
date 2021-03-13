package main

import (
	// Ayuda a escribir en la respuesta
	"context"
	"encoding/json"
	"fmt" // Imprimir en consola
	"log"
	"net/http" // El paquete HTTP
	"os"

	"cloud.google.com/go/pubsub"
	// Leer variables de entorno
)

func publish(msg string) error {

	projectID := "sopes1-307323"
	topicID := "Sopes1_pubsub"
	os.Setenv("GOOGLE_APPLICATION_CREDENTIALS", "llave.json")
	ctx := context.Background()

	//Creacion del cliente
	client, err := pubsub.NewClient(ctx, projectID)

	if err != nil {
		fmt.Println("Error al crear el cliente")
		fmt.Println("pubsub.NewClient: %v", err)
		return err
	}

	t := client.Topic(topicID)
	result := t.Publish(ctx, &pubsub.Message{Data: []byte("codigo")})

	id, err := result.Get(ctx)

	if err != nil {
		fmt.Println("Error al mandar el mensaje")
		fmt.Println(err)
		return err
	}

	fmt.Println("Published a message; msg ID: %v\n", id)
	return nil
}

// Servidor HTTP
func http_server(w http.ResponseWriter, r *http.Request) {

	if r.URL.Path != "/" {
		http.Error(w, "404 not found.", http.StatusNotFound)
		return
	}

	switch r.Method {

	case "POST":
		//Agregar header
		w.Header().Set("Content-Type", "application/json")

		//Parsing body
		var body map[string]interface{}
		err := json.NewDecoder(r.Body).Decode(&body)
		if err != nil {
			fmt.Println("error")
			return
		}
		data, err := json.Marshal(body)
		newData := string(data)
		log.Printf("Sent %s", newData)

		//Publicacion del mensaje
		publish(newData)

		//Regreso de estado
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte(newData))

	default:
		fmt.Fprintf(w, "Metodo %s no soportado \n", r.Method)
		return
	}
}

func main() {

	http.HandleFunc("/", http_server)
	print("Servidor levantado en el puerto 3000")
	//Si hay error se apaga
	if err := http.ListenAndServe(":3000", nil); err != nil {
		log.Fatal(err)
	}
}
