// !!NOTE: 'npm install' will install all modules listed as dependencies in package.json
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const dataUser = fs.readFileSync('./users.json');
const data = JSON.parse(dataUser);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

//LOGIN PAGE
app.get('/', (req, res )=>{
  res.render('login')
});
//logic for checking username and password
app.post('/', (req, res)=>{
  const {username, password} = req.body;
  if(data.username !== username || data.password !== password){
    res.render('incorrect');
  }else{
    res.render('home', {username});
  }
});
//END OF LOGIN PAGE

// HOME PAGE
app.get('/home', (req, res)=>{
  res.render('home')
})
//End of HOME PAGE
//GAME PAGE
app.get('/playgame',(req,res)=>{
  res.render('game')
})
//End of GAME PAGE

app.listen(4000, ()=>{
  console.log('RUNNING ON PORT 4000')
})