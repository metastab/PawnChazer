package repository

import (
	"context"
	"os"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type MongoDB struct {
	Client   *mongo.Client
	Database *mongo.Database
}

func NewMongoDB() (*MongoDB, error) { 
	conn := os.Getenv("MONGO_URI")  // Aman dont paste your conn string here plzz put it  in .env files

	client, err := mongo.Connect(options.Client().ApplyURI(conn))  // options.Client() --> returns *options.ClientOptions  (an empty settings struct) and .ApplyURI(conn) →  returns *options.ClientOptions  (same struct, now filled in from your connection string)
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := client.Ping(ctx, nil); err != nil {
		return nil, err
	}

	return &MongoDB{
		Client:   client,
		Database: client.Database("chessapp"), // aman write actual DB name here...
	}, nil
}