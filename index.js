const express = require("express");
require("./dbConnection");

const v1BusinessRouter = require('./v1/routes/businessRoutes');

const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res)=> {
    res.send("<h2> its working</h2>")
})

app.use("/api/v1/business", v1BusinessRouter);



app.listen(PORT, ()=> {
    console.log(`Api is listeninig on port ${PORT}`);
})
