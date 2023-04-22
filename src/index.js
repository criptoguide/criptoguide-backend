const express = require("express");
require("./database/dbConnection");
require("./database/dbUsers/userModel");
const bp = require('body-parser')
const app = express();
const cors = require('cors');
import cookieParser from "cookie-parser";
const config =  require('../config/default.js');

const PORT = config.PORT;
import deserializeUser from "./middleware/deserializeUser";


app.use(
  cors({
    origin: [config.origin,"https://www.itellyouwhere.com"],
    credentials: true,
  })
  );
  app.use(cookieParser());
  app.use(deserializeUser);

  app.use(bp.json())
  app.use(bp.urlencoded({ extended: false }))
  

//
//routes 
const v1BusinessRouter = require('./routes/businessRoutes');
const v1UserRouter = require('./routes/user.routes');
const v1UserAdminRoutes = require("./routes/userAdminRoutes");

const v1SessionsRoutes = require("./routes/sessions.routes");


app.get("/api/v1/", (req, res)=> {
   res.json("Api on")

});



app.use("/api/v1/business", v1BusinessRouter);
app.use("/api/v1/users", v1UserRouter);

app.use("/api/v1/admin", v1UserAdminRoutes);

app.use("/api/v1/sessions", v1SessionsRoutes);



app.listen(PORT, ()=> {
    console.log(`Api is listeninig on port ${PORT}`);
})
