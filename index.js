const express = require("express");
require("./database/dbConnection");
const passport = require("passport");
require("./database/dbUsers/passportConfig")(passport);
require("./database/dbUsers/userModel");
require("dotenv").config();


const v1BusinessRouter = require('./v1/routes/businessRoutes');
const v1UserRouter = require('./v1/routes/userRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=> {
    res.render("../login.ejs")
});

app.use("/api/v1/business", v1BusinessRouter);
app.use("/api/v1/auth/", v1UserRouter);


app.listen(PORT, ()=> {
    console.log(`Api is listeninig on port ${PORT}`);
})
