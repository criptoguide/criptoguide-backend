const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
import { createUserHandler } from "../controllers/user.controller";




// /users

router.post('/',  createUserHandler);




module.exports = router;

