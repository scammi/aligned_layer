package operator

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Verification struct {
	Success bool `json:"success"`
}

// func VerifyMinaProof() {
func VerifyMinaProof() {
	resp, err := http.Get("http://localhost:3000")
	if err != nil {
		fmt.Println("Error making HTTP request:", err)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		fmt.Println("Error: unexpected status code:", resp.StatusCode)
		return
	}

	var verification Verification
	if err := json.NewDecoder(resp.Body).Decode(&verification); err != nil {
		fmt.Println("Error decoding response body:", err)
		return
	}

	fmt.Println("Status:", verification.Success)
}
