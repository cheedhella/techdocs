package main

import (
    "fmt"
)

func printMessage(msg string) {
   fmt.Println(msg)
}

func main() {
    go printMessage("first") 
    printMessage("second")         // It is possible main routine can finish and die before child goroutine;
}
