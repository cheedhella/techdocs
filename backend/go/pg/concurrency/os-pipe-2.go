package main

import (
	"fmt"
	"os"
)

func main() {
	r, w, _ := os.Pipe()

	go func() {
		defer w.Close()
		w.Write([]byte("hello from os.Pipe"))
	}()

	buf := make([]byte, 64)
	n, _ := r.Read(buf)
	fmt.Println(string(buf[:n])) // "hello from os.Pipe"
}

