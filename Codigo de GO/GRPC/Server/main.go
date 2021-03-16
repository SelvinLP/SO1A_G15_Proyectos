package main

import (
	"context"
	"log"
	"net"
	"net/http"
	"strings"

	"google.golang.org/grpc"
	pb "google.golang.org/grpc/examples/helloworld/helloworld"
)

const (
	port = ":9000"
)

func failOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
	}
}

// server is used to implement helloworld.GreeterServer.
type server struct {
	pb.UnimplementedGreeterServer
}

func sendpost(value string) {

	datos := strings.NewReader(value)
	res, err := http.Post("http://localhost:8000", "application/json", datos)
	if err != nil {
		log.Printf("no enviado a node")
	} else {
		defer res.Body.Close()
	}

}

// SayHello implements helloworld.GreeterServer
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	log.Printf("Received: %v", in.GetName())
	sendpost(in.GetName())
	return &pb.HelloReply{Message: "Recibido!"}, nil
}

func main() {
	println("Servidor levantado en el puerto 9000")
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
