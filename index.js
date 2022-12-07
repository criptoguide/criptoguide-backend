const express = require("express");
require("./database/dbConnection");
const passport = require("passport");
require("./database/dbUsers/passportConfig")(passport);
require("./database/dbUsers/userModel");
require("dotenv").config();
const bp = require('body-parser')
const app = express();
const cors = require('cors');
require("dotenv").config();
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Api-Key, X-Requested-With, Content-Type, Accept, Authorization");

    next();
  });


//
//routes 
const v1BusinessRouter = require('./v1/routes/businessRoutes');
const v1UserRouter = require('./v1/routes/userRoutes');
const v1UserAdminRoutes = require("./v1/routes/userAdminRoutes");
const config = require("./config");


//only for development

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const PORT = process.env.PORT || 3001;

app.get("/", (req, res)=> {
   res.render("../login.ejs")
});



app.use("/api/v1/business", v1BusinessRouter);
app.use("/api/v1/auth", v1UserRouter);

app.use("/api/v1/admin", v1UserAdminRoutes);


app.listen(PORT, ()=> {
    console.log(`Api is listeninig on port ${PORT}`);
})
