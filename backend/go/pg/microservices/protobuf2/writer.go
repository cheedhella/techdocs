package main

import (
	"log"
	"os"

	"example.com/myapp/adr"
	"example.com/myapp/usr"
	"google.golang.org/protobuf/proto"
)

func main() {
	// Create a User object
	user := &usr.User{
		Id:   1,
		Name: "Alice",
		Age:  30,
		Addresses: []*adr.Address{
			{Address: "123 Main St", Pin: "12345"},
			{Address: "456 Oak Ave", Pin: "67890"},
		},
	}

	// Marshal to binary
	data, err := proto.Marshal(user)
	if err != nil {
		log.Fatalf("Failed to marshal user: %v", err)
	}

	// Write to file
	if err := os.WriteFile("user.bin", data, 0644); err != nil {
		log.Fatalf("Failed to write file: %v", err)
	}

	log.Println("User written to user.bin")
}
