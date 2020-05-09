package mongo

import (
	"context"
	"os"

	"github.com/mongodb/mongo-go-driver/mongo"
)

var Client, err = mongo.Connect(
	context.Background(),
	"mongodb+srv://"+os.Getenv("MONGO_USER")+":"+os.Getenv("MONGO_PW")+"@cluster0-egz7m.gcp.mongodb.net/test?retryWrites=true&w=majority",
	nil,
)
