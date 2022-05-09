const express = require('express');
const app = express();
const mongoose = require('mongoose');

const loginRouter = require('./routes/login')

const Users = require('./models/Users')

mongoose.connect('mongodb://localhost/sawgame', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res)=>{
  console.log('index')
  res.render('index')
})

app.get('/playgame', (req, res)=>{
  res.render('game')
})

app.get('/playgame/addscores/:username/:score', async  (req, res)=>{
  let user = await Users.findById(req.params.username)
  
  let updateUser = await Users.findByIdAndUpdate(user.id, {totalScore: parseInt(req.params.score)})
  res.send('i am ok')
})

app.use('/login', loginRouter);
app.listen(5000)
