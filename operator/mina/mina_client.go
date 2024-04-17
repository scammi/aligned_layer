package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type Pokemon struct {
	Name string `json:"name"`
}

func main() {
	// Make the HTTP GET request to the Pokémon API
	// resp, err := http.Get("https://pokeapi.co/api/v2/pokemon/ditto")
	resp, err := http.Get("http://localhost:3000")
	if err != nil {
		fmt.Println("Error making HTTP request:", err)
		return
	}
	defer resp.Body.Close()

	// Check if the response status code is OK (200)
	if resp.StatusCode != http.StatusOK {
		fmt.Println("Error: unexpected status code:", resp.StatusCode)
		return
	}

	// Decode the response body into a Pokemon struct
	var pokemon Pokemon
	if err := json.NewDecoder(resp.Body).Decode(&pokemon); err != nil {
		fmt.Println("Error decoding response body:", err)
		return
	}

	// Print the name of the Pokémon
	fmt.Println("Name:", pokemon.Name)
	// Add more fields printing or processing as needed
}