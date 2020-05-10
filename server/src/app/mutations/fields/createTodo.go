package mutations

import (
	mongo "app/data"
	types "app/types"
	"context"
	"log"

	"github.com/graphql-go/graphql"
)

type TodoStruct struct {
	NAME        string `json:"name"`
	DESCRIPTION string `json:"description"`
}

var CreateTodo = &graphql.Field{
	Type:        types.Todo,
	Description: "Create a todo",
	Args: graphql.FieldConfigArgument{
		"name": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
		"description": &graphql.ArgumentConfig{
			Type: graphql.String,
		},
	},

	Resolve: func(params graphql.ResolveParams) (interface{}, error) {
		// get params
		name, _ := params.Args["name"].(string)
		description, _ := params.Args["description"].(string)

		todoCollection := mongo.Client.Database("go-do-list").Collection("Todos")

		_, err := todoCollection.InsertOne(context.Background(), map[string]string{
			"name":        name,
			"description": description,
		})

		if err != nil {
			log.Fatal(err)
		}

		res := TodoStruct{name, description}

		return res, nil
	},
}
