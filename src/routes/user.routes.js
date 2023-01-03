const express = require("express");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
import requireUser from "../../middleware/requireUser";
import { createUserHandler, getCurrentUser } from "../controllers/user.controller";




// /users

router.get("/me", requireUser, getCurrentUser);

router.post('/',  createUserHandler);





module.exports = router;

