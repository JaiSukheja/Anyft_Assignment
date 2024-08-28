FROM golang:1.23-alpine

WORKDIR /websocketserver

COPY . .

RUN go mod tidy

EXPOSE 8000

CMD ["go", "run", "main.go"]


