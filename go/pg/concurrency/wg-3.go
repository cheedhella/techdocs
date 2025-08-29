package main

import (
    "fmt"
    "sync"
)

func printMessage(msg string, wg *sync.WaitGroup) {
    defer wg.Done()        
    fmt.Printf(msg)
}

func main() {
    var wg sync.WaitGroup
    
    wg.Add(2) // expecting 2 goroutines
    go printMessage("worker 1 done", &wg) // but, creating only 1 worker
    
    wg.Wait()
    fmt.Println("All workers finished")
}

