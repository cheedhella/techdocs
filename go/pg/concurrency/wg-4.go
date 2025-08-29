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
    
    wg.Add(1) // expecting 1 goroutine
    go printMessage("worker 1 done", &wg) 
    go printMessage("worker 2 done", &wg)

    wg.Wait()
    fmt.Println("All workers finished")
}

