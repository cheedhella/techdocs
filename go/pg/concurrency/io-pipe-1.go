package main

import (
	"fmt"
	"io"
)

func main() {
	pr, pw := io.Pipe()

	go func() {
		defer pw.Close()
		pw.Write([]byte("hello from io.Pipe"))
	}()

	buf := make([]byte, 64)
	n, _ := pr.Read(buf)
	fmt.Println(string(buf[:n]))
}
