if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require('mongoose');
const app = express ();
const db = mongoose.connection;
require('dotenv').config()
const Coffee = require('./models/coffeeflavors.js');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');


const initializePassport = require('./passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)
const users = [];
//___________________
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI);

// Error / success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));

//___________________
//Middleware
//___________________

//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form
app.use(flash())
app.set("view engine", "ejs");


app.use(session({
  //sets password from env file
  secret: process.env.SESSION_SECRET,
  //wont save if nothing is changed
  resave: false,
  //wont save empty information
  saveUninitialized: false
}))
//sets up
app.use(passport.initialize())
//connects with session above
app.use(passport.session())


//___________________
// Login/Register
//___________________
app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs');
})
app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/coffee',
  failedRedirect: '/login',
  //displays error message
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try{
    const hashedPassword = await
    //hashes password, 10 is standard
     bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  }catch{
    res.redirect('/register')
  }
  console.log(users);
})

app.delete('/logout', (req, res) => {
  //function from passport
  req.logOut()
  res.redirect('/login')
})

//___________________
// Routes
//___________________
//localhost:3000

app.get('/coffee', checkAuthenticated, (req, res) => {
  res.render('index.ejs')
})
app.get('/coffee/new', checkAuthenticated, (req, res) => {
  res.render('new.ejs');
})

app.get('/coffee/creations', checkAuthenticated, (req, res) => {
  res.render('creations.ejs')
})

app.get('/coffee/loginuser', checkAuthenticated, (req, res) => {
  res.render('login.ejs')
})
app.get('/coffee/:id/edit', (req, res) => {
  Coffee.findById(req.params.id , (error, foundCoffee) => {
    res.render('edit.ejs',
    {
      coffee:foundCoffee
    })
  })
})

app.put('/coffee/usercreations:id', checkAuthenticated, (req, res) => {
  // res.send('updating.....')
  Coffee.findByIdAndUpdate(req.params.id, req.body, {new:true}, (error, updatedDrink) => {
    res.redirect('coffee/usercreations')
  })
})

app.get('/coffee/usercreations', checkAuthenticated, (req, res) => {
  Coffee.find({}, (error, allCoffee) => {
    res.render('userdrinks.ejs',
    {
      coffee: allCoffee
    })
  })
})

app.delete('/coffee/usercreations/:id', checkAuthenticated, (req, res) => {
  Coffee.findByIdAndRemove(req.params.id, (error, data) => {
    // console.log(error);
    res.redirect('/coffee/usercreations');
  })
})
app.post('/coffee/usercreations', checkAuthenticated, (req, res) => {
  Coffee.create(req.body, (error, newCoffee) => {
  //   if (error) {
  //     console.log(error);
  //   }else{
  //   res.send(newCoffee)
  // }
  res.redirect('/coffee/usercreations')
  })
})


//-------------------
//Functions to check user being logged in
//-------------------


function checkAuthenticated(req,res,next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/login')
}

function checkNotAuthenticated(req, res, next){
  if (req.isAuthenticated()) {
    return res.redirect('/coffee')
  }
  next()
}



//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));
