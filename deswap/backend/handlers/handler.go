package handlers

import (
	"context"
	"encoding/json"
	"net/http"

	"github.com/IgorLTS10/PA-4IBC/prisma/db" // Prisma Client
	"github.com/gorilla/mux"
)

// Créer un utilisateur
func CreateUserHandler(w http.ResponseWriter, r *http.Request) {
	var input struct {
		WalletAddress string `json:"walletAddress"`
		UniqueID      string `json:"uniqueID"`
	}

	if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := db.Prisma.User.CreateOne(
		db.User.WalletAddress.Set(input.WalletAddress),
		db.User.UniqueID.Set(input.UniqueID),
	).Exec(context.Background())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}

// Obtenir tous les utilisateurs
func GetUsersHandler(w http.ResponseWriter, r *http.Request) {
	users, err := db.Prisma.User.FindMany().Exec(context.Background())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

// Obtenir un utilisateur par ID
func GetUserByIDHandler(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	userID := params["id"]

	user, err := db.Prisma.User.FindUnique(
		db.User.ID.Equals(userID),
	).Exec(context.Background())
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(user)
}
