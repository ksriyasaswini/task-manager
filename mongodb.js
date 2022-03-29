// CRUD create read update delete

//const mongodb = require('mongodb')
// const MongoClient = mongodb.MongoClient
// const ObjectID = mongodb.ObjectID
const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()

MongoClient.connect(connectionURL, { useNewUrlParser: true}, (error, client) => {
    if (error) {
        return console.log('Unable to connect to db')
    }
    console.log('Connected correctly!!')

    const db = client.db(databaseName)
    //CREATE
    //FIND
    //UPDATE
    //DELETE
    // db.collection('users').deleteMany({
    //     age:23
    // }).then((result) => {
    //     console.log(result)
    // }).catch((error) => {
    //     console.log(error)
    // })

    db.collection('task').deleteOne({
        description: 'Task2'
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.log(error)
    })
    
})