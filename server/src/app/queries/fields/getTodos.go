package queries

import (
	mongo "app/data"
	types "app/types"
	"context"
	"log"

	"github.com/graphql-go/graphql"
	"github.com/mongodb/mongo-go-driver/bson"
	"github.com/mongodb/mongo-go-driver/bson/primitive"
)

type TodoStruct struct {
	ID          *primitive.ObjectID `json:"_id" bson:"_id"`
	NAME        string              `json:"name"`
	DESCRIPTION string              `json:"description"`
}

var GetTodos = &graphql.Field{
	Type:        graphql.NewList(types.Todo),
	Description: "Get all todos",
	Resolve: func(params graphql.ResolveParams) (interface{}, error) {
		todoCollection := mongo.Client.Database("go-do-list").Collection("Todos")

		cursor, err := todoCollection.Find(context.Background(), bson.D{{}})

		if err != nil {
			log.Fatal(err)
		}

		var todosList []TodoStruct

		// Finding multiple documents returns a cursor
		// Iterating through the cursor allows us to decode documents one at a time
		for cursor.Next(context.Background()) {
			todo := TodoStruct{}

			// convert BSON to struct
			err := cursor.Decode(&todo)
			if err != nil {
				log.Fatal(err)
			}

			todosList = append(todosList, todo)
		}

		// Close the cursor once finished
		cursor.Close(context.Background())

		return todosList, nil
	},
}
