//CRUD

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient

const connectionURL = 'mongodb://127.0.0.1:27017'
const dataBaseName = 'task-manager'

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {

        if (error) {
            return console.log("Unable to connect");
        }

        const db = client.db(dataBaseName)

        // db.collection('users').insertOne({
        //     name: 'Dennis',
        //     age: 47
        // }, (error, result) => {
        //     if (error) {
        //         return console.log('Unable to insert user')
        //     }
        //     console.log(result.result)
        //     console.log(result.ops)
        // })

        // db.collection('users').insertMany([{
        //     name: 'Dennis Smith',
        //     age: 47
        // }, {
        //     name: 'Joe Smith',
        //     age: 22
        // }], (error, result) => {

        //     if (error) {
        //         return console.log('Unable to insert user')
        //     }
        //     console.log(result.result)
        //     console.log(result.ops)
        // })

        db.collection('tasks').insertMany([{
            description: 'Take out trash',
            complete: false
        }, 
        {
            description: 'Feed the dog',
            complete: true
        },
        {
            description: 'Kick the cat',
            complete: false
        }], (error, result) => {

            if (error) {
                return console.log('Unable to insert task')
            }
            console.log(result.result)
            console.log(result.ops)
        })
})

