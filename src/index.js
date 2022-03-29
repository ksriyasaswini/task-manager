const express = require('express')
const multer = require('multer')
require('./db/mongoose')

const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const Tasks = require('./models/task')
const User = require('./models/user')

const app = express()
const port = process.env.PORT

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, () => {
    console.log('Server is up at port ' + port)
})

