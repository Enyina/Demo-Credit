const router = require("express").Router();
const {
  sendFunds,
  creditAccount,
  withdrawal,
} = require("../controllers/transactions");

router.post("/deposit", creditAccount);
router.post("/withdraw", withdrawal);
router.post("/transfer", sendFunds);

module.exports = router;
