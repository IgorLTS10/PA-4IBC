package main

import (
	"log"
	"net/http"

	"github.com/IgorLTS10/PA-4IBC/handlers"
	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()

	// Définir les routes
	router.HandleFunc("/users", handlers.CreateUserHandler).Methods("POST")
	router.HandleFunc("/users", handlers.GetUsersHandler).Methods("GET")
	router.HandleFunc("/users/{id}", handlers.GetUserByIDHandler).Methods("GET")

	// Démarrer le serveur
	log.Println("Server is starting on port 8000...")
	log.Fatal(http.ListenAndServe(":8000", router))
}
