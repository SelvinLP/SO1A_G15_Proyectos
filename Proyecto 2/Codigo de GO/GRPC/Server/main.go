package main

import (
	"context"
	"log"
	"net"
	//"net/http"
	//"strings"
	"github.com/garyburd/redigo/redis"
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
	res, err := http.Post("http://34.72.16.244:3000", "application/json", datos)
	if err != nil {
		log.Printf("no enviado a node")
	} else {
		defer res.Body.Close()
	}
	
	
	
	//REDIS
	conn2, err := redis.Dial("tcp",
		"redis-18733.c1.us-central1-2.gce.cloud.redislabs.com:18733",
		redis.DialPassword("sopes12021"))

	//PARTE DE REDIS
	if err != nil {
		log.Fatal(err)
	}
	if _, err = conn2.Do("APPEND", "foo", value+","); err != nil {
		log.Fatal(err)
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
