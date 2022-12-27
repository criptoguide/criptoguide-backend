const express = require("express");
require("./database/dbConnection");
require("./database/dbUsers/userModel");
require("dotenv").config();
const bp = require('body-parser')
const app = express();
const cors = require('cors');


app.use(
    cors({
      origin: ["http://localhost:3000"],
      methods: "GET,POST,PUT,DELETE,OPTIONS",
    })
  );

app.use(bp.json())
app.use(bp.urlencoded({ extended: false }))

//
//routes 
const v1BusinessRouter = require('./routes/businessRoutes');
const v1UserRouter = require('./routes/userRoutes');
const v1UserAdminRoutes = require("./routes/userAdminRoutes");



const PORT = process.env.PORT || 8080;

app.get("/", (req, res)=> {
   res.render("./src/login.ejs")
});



app.use("/api/v1/business", v1BusinessRouter);
app.use("/api/v1/auth", v1UserRouter);

app.use("/api/v1/admin", v1UserAdminRoutes);


app.listen(PORT, ()=> {
    console.log(`Api is listeninig on port ${PORT}`);
})
