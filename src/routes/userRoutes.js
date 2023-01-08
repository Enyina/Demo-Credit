const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/createaccount", userController.createCustomer);

module.exports = router;
