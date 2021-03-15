//Package definition
package main

//Imports
import (
	//"context"

	"context"
	chat "grpcTutorial/chatserver"
	"log"

	//chat "grpcTutorial/chatserver"

	//"google.golang.org/grpc"

	"fmt" // Imprimir en consola
	// Ayuda a escribir en la respuesta
	"net/http" // El paquete HTTP

	"encoding/json"
	"flag"
	"io/ioutil"

	"google.golang.org/grpc"
)

var (
	// flagPort is the open port the application listens on
	flagPort = flag.String("port", "9000", "Port to listen on")
)

var results []string

// GetHandler handles the index route
func GetHandler(w http.ResponseWriter, r *http.Request) {
	jsonBody, err := json.Marshal(results)
	if err != nil {
		http.Error(w, "Error converting results to json",
			http.StatusInternalServerError)
	}
	w.Write(jsonBody)
}

// PostHandler converts post request body to string
func PostHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == "POST" {
		body, err := ioutil.ReadAll(r.Body)
		if err != nil {
			http.Error(w, "Error reading request body",
				http.StatusInternalServerError)
		}

		fmt.Fprint(w, "POST done ", string(body))
	} else {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}

func init() {
	log.SetFlags(log.Lmicroseconds | log.Lshortfile)
	flag.Parse()
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
		println("\nSent " + newData)
		//Publicacion del mensaje
		enviar(newData)
		//Regreso de estado
		w.WriteHeader(http.StatusCreated)
		w.Write([]byte(newData))

	default:
		fmt.Fprintf(w, "Metodo %s no soportado \n", r.Method)
		return
	}
}

// Send client GRPC

func enviar(mensaje string) {
	//We create a new Client and we assign credentials using  grpc.Dial
	//We assing the port where the server is listening, in this case port 9000
	var conn *grpc.ClientConn
	conn, err := grpc.Dial(":9000", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("Did not connect: %s", err)
	}
	defer conn.Close()

	//Stub creation
	c := chat.NewChatServiceClient(conn)

	//Service method call, we send a MessageRequest and receive in response a MessageReply

	response, err := c.SendMessage(context.Background(), &chat.MessageRequest{Name: mensaje})
	if err != nil {
		log.Fatalf("Error when calling SendMessage: %s", err)
	}
	println("Response from server: ", response.Body)

}

//Main definition
func main() {
	http.HandleFunc("/", http_server)
	print("Servidor levantado en el puerto 3000")
	//Si hay error se apaga
	if err := http.ListenAndServe(":3000", nil); err != nil {
		log.Fatal(err)
	}

}
