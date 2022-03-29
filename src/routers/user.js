const express = require('express')
const multer = require('multer')
const storage = multer.memoryStorage()
const sharp = require('sharp')

const router = new express.Router()
const User = require('../models/user')
const auth =  require('../middleware/auth')

const {sendWelcomeEmail, sendCancelEmail} = require('../emails/account')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    const token = await user.generateAuthToken()
    try {
        await user.save()
        console.log(user.email)
        console.log(user.name)
        sendWelcomeEmail(user.email, user.name)
        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.token = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()

    } catch(e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    // try {
    //     const users = await User.find({})
    //     res.send(users)
    // }catch(e) {
    //     res.status(500).send(e)
    // }
    res.send(req.user)
})

// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id
//     try {
//         const users = await User.findById(_id)
//         if(!users) {
//             return res.status(404).send()
//         }
//         res.send(users)
//     }catch(e) {
//         res.status(500).send(e)
//     }
// })

// router.patch('/users/:id', async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['name', 'email', 'password', 'age']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
//     try {
//         if(!isValidOperation) {
//             return res.status(400).send('invalid Updates')
//         }
//         const user = await User.findById(req.params.id)
//         updates.forEach((update) => {
//             user[update] = req.body[update]
//         })
//         await user.save()
//         //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
//         if(!user){
//             res.status(404).send()
//         }
//         res.send(user)
//     } catch(e) {
//         res.status(500).send(e)
//     }
// })

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    console.log(updates)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    console.log(isValidOperation)
    try {
        if(!isValidOperation) {
            return res.status(400).send('invalid Updates')
        }
        updates.forEach((update) => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        //const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

        res.send(req.user)
    } catch(e) {
        res.status(500).send(e)
    }
})

// router.delete('/users/:id', auth, async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id)
//         if(!user) {
//             return res.status(404).send()
//         }
//         res.send(user)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

const upload = multer({
    dest: 'avatar',
    limits:{
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Only images supported'))
        }
        cb(undefined, true)
    }, storage
})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({width:250, height: 250}).png().toBuffer()
    //req.user.avatar = req.file.buffer
    console.log(req.file.buffer)
    await req.user.save()
    res.send()
}, (error, req, res, next)=> {
    res.status(400).send({error: error.message})
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}, (error, req, res, next)=> {
    res.status(400).send({error: error.message})
})

router.get('/users/:id/avatar', async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        res.send(user.avatar)
    } catch(e) {
        res.status(404).send()
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        sendCancelEmail(req.user.email, req.user.name)
        res.status(200).send(req.user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router