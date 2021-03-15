package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

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
		//Publicacion del mensaje
		println(newData)
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
	print("Servidor levantado en el puerto 8000")
	//Si hay error se apaga
	if err := http.ListenAndServe(":8000", nil); err != nil {
		log.Fatal(err)
	}

}
