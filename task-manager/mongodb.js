//CRUD


const {MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const dataBaseName = 'task-manager'

const id = new ObjectID()
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, {useNewUrlParser: true}, (error, client) => {

        if (error) {
            return console.log("Unable to connect");
        }

        const db = client.db(dataBaseName)

        // db.collection('users').deleteMany({
        //     name: "Dennis"
        // }).then((result) => {
        //         console.log(result)
        // }).catch(() => {
        //         console.log(error)
        // })
    
        db.collection('tasks').deleteOne({
            description : "Take out trash",
        }).then((result) => {
                console.log(result)
        }).catch(() => {
                console.log(error)
        })

        // const updatePromise = db.collection('users').updateOne({
        //     _id: new ObjectID("5e9b5deef569975058e10963")
        // }, {
        //     // $set: {
        //     //     name: "Ken"
        //     // }
        //     $inc: {
        //         age: 10
        //     }
        // })
        
        // updatePromise.then((result) => {
        //     console.log(result)
        // }).catch(() => {
        //     console.log(error)
        // })

        // db.collection('users').findOne({name: "Dennis", age: 49}, (error, user) => {
        //     if (error) {
        //         return console.log("Unable to fetch");
        //     }
        //     console.log(user);
        // })

        // db.collection('users').find({age: 47}).count((error, count) => {
        //     console.log(count);
        // });

        // db.collection('users').find({age: 47}).toArray((error, users) => {
        //     console.log(users);
        // });

        // db.collection('tasks').find({_id: new ObjectID("5e9b5fd2e728803f849021cd")}).toArray((error, tasks) => {
        //     console.log(tasks);
        // });

        // db.collection('tasks').find({complete: false}).toArray((error, tasks) => {
        //     console.log(tasks);
        // });
        // db.collection('users').insertOne({
        //     _id: id,
        //     name: 'Maude',
        //     age: 99
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

        // db.collection('tasks').insertMany([{
        //     description: 'Take out trash',
        //     complete: false
        // }, 
        // {
        //     description: 'Feed the dog',
        //     complete: true
        // },
        // {
        //     description: 'Kick the cat',
        //     complete: false
        // }], (error, result) => {

        //     if (error) {
        //         return console.log('Unable to insert task')
        //     }
        //     console.log(result.result)
        //     console.log(result.ops)
        // })


})

