//Package chat definition
package chat

//Imports
import (
	"context"
	"log"
	"net/http"
	"strings"
)

//Server struct definition
type Server struct {
}

func sendpost(value string) {
	val := strings.Split(value, "}")[0]
	var sb strings.Builder
	sb.WriteString(string(val))
	sb.WriteString(", \"tipo\":\"GRPC\" }")

	datos := strings.NewReader(sb.String())
	res, err := http.Post("http://localhost:8000/", "application/json", datos)
	if err != nil {
		log.Printf("no enviado a node")
	} else {
		defer res.Body.Close()
	}

}

//SendMessage function implementation
func (s *Server) SendMessage(ctx context.Context, in *MessageRequest) (*MessageReply, error) {
	log.Printf("Received message: %s", in.GetName())
	sendpost(in.GetName())
	return &MessageReply{Body: "Received from server!"}, nil
}
