package concurrency
package main

import (
    "fmt"
    "sync"
    "time"
)

func worker(id int, wg *sync.WaitGroup) {
    defer wg.Done() // Defer guarantees that wg.done() is executed at the end of function, no matter how the function exits;
    fmt.Printf("Worker %d starting\n", id)
    time.Sleep(time.Second) // simulate work
    fmt.Printf("Worker %d done\n", id)
}

func main() {
    var wg sync.WaitGroup

    for i := 1; i <= 3; i++ {
        wg.Add(1) // tell WaitGroup we have one more goroutine - always call this, before starting a new goroutine;
        go worker(i, &wg)   // Never pass the copy of WaitGroup — always pass a pointer (&wg)
    }

    wg.Wait() // block until all goroutines are done; If the counter hits zero, any goroutine that called wg.Wait() will unblock and continue;
    fmt.Println("All workers finished")
}
