const express = require("express");
require("./database/dbConnection");
require("./database/dbUsers/userModel");
require("dotenv").config();
const bp = require('body-parser')
const app = express();
const cors = require('cors');
import deserializeUser from "../middleware/deserializeUser";
const PORT = process.env.PORT || 8080;

app.use(deserializeUser);

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
const v1UserRouter = require('./routes/user.routes');
const v1UserAdminRoutes = require("./routes/userAdminRoutes");

const v1SessionsRoutes = require("./routes/sessions.routes");


app.get("/", (req, res)=> {
   res.json("App working")
});



app.use("/api/v1/business", v1BusinessRouter);
app.use("/api/v1/users", v1UserRouter);

app.use("/api/v1/admin", v1UserAdminRoutes);

app.use("/api/v1/sessions", v1SessionsRoutes);



app.listen(PORT, ()=> {
    console.log(`Api is listeninig on port ${PORT}`);
})
