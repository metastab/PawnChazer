package handler

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/vivekchaurasia01/pawnchazer-backend/internal/service"
)


var ErrNoDocuments = errors.New("No documents found")


type UserHandler struct {
	services service.UserService
}

func NewUserHandler (services service.UserService) *UserHandler {
	return &UserHandler{services: services}
}

func (h *UserHandler) GetProfile (w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id");

	user, err := h.services.GetProfile(r.Context(), id) 
	if err != nil {
		if errors.Is(err, ErrNoDocuments) {
			http.Error(w,"User not found",http.StatusNotFound)
			return
		}
		http.Error(w,"Internal Server Error", http.StatusInternalServerError)
		return 
	}

	w.Header().Set("Content-Type","application/json")
	json.NewEncoder(w).Encode(user)
}