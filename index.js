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
app.use(cors({
  origin: "*",
  methods: "GET, POST, PATCH, DELETE, PUT",
  allowedHeaders: "Content-Type, Authorization",
}));



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
