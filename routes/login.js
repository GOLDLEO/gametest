var express = require('express');
const { append, redirect } = require('express/lib/response');
var router = express.Router();
const Users = require('../models/Users')



router.post('/', async (req, res, next)=>{
    console.log(req.body.username)
    try{
        let user = new Users({
            username: req.body.username,
        })
        user = await user.save()
        console.log('user created')
        redirect(`login/user/${user.slag}`)
        next()
    }catch(e){
        console.log('user already')
        let currentUser =  await Users.findOne({username: req.body.username});
        console.log(currentUser.username)
        console.log(currentUser.slug)
        console.log(currentUser.createdAt)
        // await Users.findByIdAndDelete(currentUser.id)
        res.redirect(`login/user/${currentUser.slug}`)
    }

})


router.get('/user/:slug', async (req, res)=>{
    let user = await Users.findOne({slug: req.params.slug})
    let users = await Users.find().sort({totalScore: -1})
    res.render('user', {user: user,  users: users})
})

router.get('/user/remove/:id', async(req, res)=>{
    await Users.findByIdAndDelete(req.params.id)
    res.send('user deleted')
})


module.exports = router;