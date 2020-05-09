package queries

import (
	mongo "app/data"
	types "app/types"
	"context"

	"github.com/graphql-go/graphql"
	"github.com/mongodb/mongo-go-driver/bson/primitive"
)

type TodoStruct struct {
	ID          *primitive.ObjectID `json:"id" bson:"_id"`
	NAME        string              `json:"name"`
	DESCRIPTION string              `json:"description"`
}

var GetTodos = &graphql.Field{
	Type:        graphql.NewList(types.Todo),
	Description: "Get all todos",
	Resolve: func(params graphql.ResolveParams) (interface{}, error) {
		todoCollection := mongo.Client.Database("go-do-list").Collection("Todos")

		todos, err := todoCollection.Find(context.Background(), nil)
		if err != nil {
			panic(err)
		}

		var todosList []TodoStruct

		for todos.Next(context.Background()) {
			todo := TodoStruct{}

			// convert BSON to struct
			err := todos.Decode(&todo)
			if err != nil {
				panic(err)
			}

			todosList = append(todosList, todo)
		}

		return todosList, nil
	},
}
