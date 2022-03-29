const mongoose = require('mongoose')
const validator = require('validator')

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true
})

// const User = mongoose.model('User', {
//     name: {
//         type: String,
//         required: true,
//         trim: true
//     },
//     email: {
//         type: String,
//         required: true,
//         trim: true,
//         lowercase: true,
//         validate(value) {
//             if(!validator.isEmail(value)) {
//                 throw new Error('Email is invalid!!')
//             }
//         }
//     },
//     password:{
//         type: String,
//         required: true,
//         trim: true,
//         minlength: 7,
//         validate(value) {
//             if(validator.contains('password' )) {
//                 throw new Error(' Incorrect password!!')
//             }
//         }
//     },
//     age: {
//         type: Number,
//         default: 0,
//         validate(value) {
//             if (value < 0){
//                 throw new Error('Age must be a positive number')
//             }
//         }
//     }
// })

// const me = new User({
//      name: ' Kandarpa ',
//      email: 'sri@gmail.com  ',
//      password: 'password@123'
// })

// me.save().then((instance) => {
//     console.log(instance)
// }).catch((error) => {
//     console.log('Error...', error)
// })

// const Tasks = mongoose.model('tasks', {
//     description:{
//         type: String,
//         trim: true,
//         required: true
//     },
//     completed:{
//         type: Boolean,
//         default: false
//     }
// })

// const task = new Tasks({
//     description: 'Task3',
//     completed: true
// })

// task.save().then((instance) => {
//     console.log(instance)
// }).catch((error) => {
//     console.log('Error...', error)
// })