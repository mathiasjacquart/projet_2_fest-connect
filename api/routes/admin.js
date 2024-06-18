const {signinAdmin, signupAdmin} = require("../controllers/admins-controller")
  
  const router = require("express").Router();
  
  
  router.post("/signin", signinAdmin);
  router.post("/signup", signupAdmin);
  
  module.exports = router;