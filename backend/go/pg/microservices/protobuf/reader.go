package main

import (
	"log"
	"os"

	"example.com/myapp/usr"
	"google.golang.org/protobuf/proto"
)

func main() {
	// Read the binary data from the file
	data, err := os.ReadFile("user.bin")
	if err != nil {
		log.Fatalf("Failed to read file: %v", err)
	}

	// Create a new User object to unmarshal into
	user := &usr.User{}

	// Unmarshal the data
	if err := proto.Unmarshal(data, user); err != nil {
		log.Fatalf("Failed to unmarshal user: %v", err)
	}

	log.Printf("User read from user.bin: ID=%d, Name=%s", user.GetId(), user.GetName())
}
