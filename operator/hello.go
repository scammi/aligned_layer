package main

import (
	"bytes"
	"fmt"
	"os/exec"
)

func main() {
	// Command to execute the JavaScript file with arguments
	cmd := exec.Command("node", "./hello.js", "arg1", "arg2", "arg3")

	// Capture output
	var out bytes.Buffer
	cmd.Stdout = &out

	// Execute command
	err := cmd.Run()
	if err != nil {
		fmt.Println("Error executing JavaScript script:", err)
		return
	}

	// Print captured output
	fmt.Println("Output:", out.String())
}
