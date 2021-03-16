package main

import "fmt"

type myClase struct {
	dato int
	s    string
}

func main() {
	clase := new(myClase)
	clase.dato = 50
	clase.s = "Hola mi edad es: "
	fmt.Println(clase.s, clase.dato)
}
