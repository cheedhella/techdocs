package main

import (
	"fmt"
	"os"
	"os/exec"
)

func main() {
	// Create the pipe (for stdout of echo → stdin of grep)
	r, w, err := os.Pipe()
	if err != nil {
		panic(err)
	}

	// First command: echo "hello world"
	echoCmd := exec.Command("echo", "hello world")
	echoCmd.Stdout = w // Output of the command is written to the write end of the pipe

	// Second command: grep "hello"
	grepCmd := exec.Command("grep", "hello")
	grepCmd.Stdin = r // grepCmd takes input from read end of the pipe

	// output of grepCmd is redirected to stdout
	grepCmd.Stdout = os.Stdout

	// Start echo
	if err := echoCmd.Start(); err != nil {
		panic(err)
	}

	// Start grep
	if err := grepCmd.Start(); err != nil {
		panic(err)
	}

	// Close parent's copies (important!)
	w.Close()
	r.Close()

	// Wait for both processes
	if err := echoCmd.Wait(); err != nil {
		panic(err)
	}
	if err := grepCmd.Wait(); err != nil {
		panic(err)
	}

	fmt.Println("Pipeline finished successfully")
}

