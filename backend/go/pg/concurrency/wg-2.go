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

    words := []string{
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
    }

    wg.Add(10)
    for i, x := range words {
        go printMessage(fmt.Sprintf("%d: %s \n", i, x), &wg)  // For each word, create a routine 
    }

    wg.Wait()                           // block until all goroutines are done;
    fmt.Println("All workers finished")
}

