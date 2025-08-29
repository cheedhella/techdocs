package main

import (
    "fmt"
    "time"
)

func printMessage(msg string) {
   fmt.Println(msg)
}

func main() {
    go printMessage("first") 
    time.Sleep(1 * time.Millisecond) // sleep for 1 second, so that child thread finishes
    printMessage("second")
}

