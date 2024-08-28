package main

import (
	"fmt"
	"net/http"

	"golang.org/x/net/websocket"
)

type msg struct {
	Message string `json:"message"`
	Reverse string `json:"reverse"`
}

func reverse(s string) string {
	r := []rune(s)
	for i, j := 0, len(r)-1; i < len(r)/2; i, j = i+1, j-1 {
		r[i], r[j] = r[j], r[i]
	}
	return string(r)
}

var messages []msg

func WebMessageServer(ws *websocket.Conn) {
	var message string

	for {
		err := websocket.Message.Receive(ws, &message)
		if err != nil {
			fmt.Println("Can't receive")
			break
		}
		fmt.Println("Received from client: " + message)

		newMessage := msg{Message: message, Reverse: reverse(message)}

		if len(messages) < 5 {
			messages = append(messages, newMessage)
		} else {
			messages = append(messages[1:], newMessage)
		}

		fmt.Println("Sending to client: " + newMessage.Reverse)
		err = websocket.Message.Send(ws, newMessage.Reverse)
		if err != nil {
			fmt.Println("Can't send")
			break
		}
	}
}

func WebHistoryServer(ws *websocket.Conn) {
	err := websocket.JSON.Send(ws, messages)
	if err != nil {
		fmt.Println("Can't send history")
	}
}

func main() {
	http.Handle("/ws", websocket.Handler(WebMessageServer))
	http.Handle("/history", websocket.Handler(WebHistoryServer))

	fmt.Println("Server started on :8000")

	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		fmt.Println("Error starting server:", err)
	}
}
