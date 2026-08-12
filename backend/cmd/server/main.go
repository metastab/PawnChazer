package main

import (
	"context"
	"log"
	"net/http"

	"github.com/joho/godotenv"
	"github.com/vivekchaurasia01/pawnchazer-backend/internal/handler"
	"github.com/vivekchaurasia01/pawnchazer-backend/internal/repository"
	"github.com/vivekchaurasia01/pawnchazer-backend/internal/service"
)

func main () {

	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found....")
	}
	mongoDb, err := repository.NewMongoDB() 
	if err != nil {
		log.Fatal(err)
	}
	defer mongoDb.Client.Disconnect(context.Background())

	userRepo := repository.NewUserRepository(mongoDb.Database)
	userServices := service.NewUserRepository(userRepo)
	UserHandler := handler.NewUserHandler(*userServices)

	mux := http.NewServeMux()
	mux.HandleFunc("GET/api/users/{id}/profile", UserHandler.GetProfile)

	log.Println("Server strting on :8080")
	log.Fatal(http.ListenAndServe(":8080",mux))
}