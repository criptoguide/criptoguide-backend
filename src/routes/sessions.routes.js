const express = require("express");
const { default: requireUser } = require("../../middleware/requireUser");
const { getUserSessionsHandler, deleteSessionHandler, createUserSessionHandler, googleOAuthHandler } = require("../controllers/session.controller");
const router = express.Router();



//     /sessions


router.post('/create',  createUserSessionHandler );


router.delete('/delete', requireUser, deleteSessionHandler);
router.get('/', requireUser, getUserSessionsHandler);


router.get('/oauth/google', googleOAuthHandler);


module.exports = router;

