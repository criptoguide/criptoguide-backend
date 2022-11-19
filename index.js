const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('express');

const app = express();



app.get('/', (req, res)=> {

res.json("welcome to the api")

})

app.get('/' (req, res) => {

    axios.get()
})


app.listen(PORT, ()=>console.log(`server running in ${PORT}`) )