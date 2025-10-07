package main

import (
	"log"
	"os"

	"example.com/myapp/usr"
	"google.golang.org/protobuf/proto"
)

func main() {
	// Create a User object
	u1 := &usr.User{
		Id:   1,
		Name: "Alice",
	}

	// Marshal to binary
	data, err := proto.Marshal(u1)
	if err != nil {
		log.Fatalf("Failed to marshal user: %v", err)
	}

	// Write to file
	if err := os.WriteFile("user.bin", data, 0644); err != nil {
		log.Fatalf("Failed to write file: %v", err)
	}

	log.Println("User written to user.bin")
}
