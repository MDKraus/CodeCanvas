const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const session = require('express-session');
const path = require('path');
const PORT = process.env.PORT || 3000;
const hbs = exphbs.create({});
//const routes = require('./controllers');

//Sequelize
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//Session
const sess = {
  secret: 'bob ross',
  cookie: {
    maxAge: 300000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

//Handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//JSON parse middleware
app.use(express.urlencoded( {extended:true}));
app.use(express.json());

//CSS styles middleware
app.use('/public', express.static(path.join(__dirname, 'public')));
  
app.use('/', routes);

//Homepage route
app.get('/', (req,res) => {
    res.render('homepage');
})

app.listen(PORT, () => {
    console.log (`Server running on ${PORT}`)
});