package model

import "go.mongodb.org/mongo-driver/v2/bson"

type User struct {
    ID             bson.ObjectID `bson:"_id,omitempty" json:"id"`
    Username       string        `bson:"username" json:"username"`
    Name           string        `bson:"name" json:"name"`
    ProfilePicture string        `bson:"profilePicture" json:"profilePicture"`
    Rating         int           `bson:"rating" json:"rating"`
    Analytics      Analytics     `bson:"analytics" json:"analytics"`
}

