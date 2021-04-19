FROM golang:1.16

WORKDIR /go/src/app

COPY . .

RUN go mod download

CMD ["go","run","pub.go"]