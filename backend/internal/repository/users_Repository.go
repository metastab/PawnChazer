package repository

import (
	"context"

	"github.com/vivekchaurasia01/pawnchazer-backend/internal/model"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
)

type UserRepository interface 
{
	GetByID (ctx context.Context, id string) (*model.User, error)
}

type MongoUserRepository struct 
{
	Collection *mongo.Collection
}

func NewUserRepository(db *mongo.Database) *MongoUserRepository { 
	return &MongoUserRepository{
		Collection: db.Collection("users"),
	}
}


func (m *MongoUserRepository) GetByID (ctx context.Context, id string) (*model.User, error)  {
	objID, err := bson.ObjectIDFromHex(id) //ObjectIDFromHex creates a new ObjectID from a hex string. It returns an error if the hex string is not a valid ObjectID.
	if err != nil {
		return nil, err
	}

	var user model.User
	//FindOne executes a find command and returns a SingleResult for one document in the collection.
	//M is an unordered representation of a BSON document. This type should be used when the order of the elements does not matter. This type is handled as a regular mapstringany when encoding and decoding. Elements will be serialized in an undefined, random order. If the order of the elements matters, a D should be used instead.
	err = m.Collection.FindOne(ctx, bson.M{"_id": objID}).Decode(&user) 
	if err != nil {
		return nil, err
	}

	return &user, nil
}