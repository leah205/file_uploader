const path = require("node:path");
const express = require("express");
const session = require("express-session");

const passport = require("./passport")
const flash = require('connect-flash')
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('./generated/prisma');
const indexRouter = require('./routes/index')

//make responsive
//figure out file view structure
//file back button
//separate queries into dif files
//when to prisma disconnect
//delete try catch in children
//delete index.ejs and make it home folder
//create home folder automatically that user redirects to 
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));


app.use(
  session({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: process.env.SECRET, 
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
  })
);
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(flash())
app.use(express.json())

app.use((req, res, next) => {
  res.locals.user = req.user
  next()
})

app.use((err, req, res, next) => {
  //console.error(err)
  //res.send(err.msg)
})

app.use('/', indexRouter);


app.listen(process.env.HOST || 3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});