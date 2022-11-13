//Building your server with, port(s), routes, & necessary dependencies/middleware.

const express = require("express")
const path = require("path")
const favicon = require("serve-favicon")
const morgan = require("morgan")
require("dotenv").config()
//connecting to the database (MongoDB)
require('./config/database');

const app = express()

// Configure to use port 3001 instead of 3000 during development to avoid collision with React's dev server
const PORT = process.env.PORT || 3001

//middleware:
app.use(morgan("dev"))
// using this middleware because we are using JSON data vs sending data with forms (urlencoded())
app.use(express.json())  

// Configure both serve-favicon & static middleware to serve from the production 'build' folder:
    //passing location of favicon icon and location of production application (serving these files from production build folder)
app.use(favicon(path.join(__dirname, "build", "favicon.ico")))
app.use(express.static(path.join(__dirname, "build")))

// Middleware to verify token and assign user object of payload to req.user.
// Be sure to mount before routes
app.use(require('./config/checkToken'));

//// API routes here, before the "catch all" route
////     NOTE: These routes are handling the requests from the front end to the database (the Application Programming Interface (API))
////         app.get("/orders", ()=>{
////         })
////         app.get("/orders/new", ()=>{
////         })

// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));
app.use("/api/projects", require("./routes/api/projects"))

//the Catch All Route to serve the production app
    //NOTE: This is the route that connects the production app "hosted on database"
app.get("/*", (req, res)=>{
    res.send(path.join(__dirname, "build", "index.html"))
})

// Configure to use port 3001 instead of 3000 during development to avoid collision with React's dev server
app.listen(PORT, () =>{
    console.log(`Server running on port: ${PORT} `)
})
