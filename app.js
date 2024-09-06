var express = require('express');
var app = express();
const readline = require('node:readline');


app.get('/', function(req, res) {
    res.send('Hello World!');
})

app.listen(4000, function () {
    console.log('Server Starting...');
});

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://tlorenzo114:CqXlOleaMiAn7WFM@cluster0.cwrt9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


  rl.question(``, command => {
    if(command == "zz"){
      console.log(command);
    }
  }); 