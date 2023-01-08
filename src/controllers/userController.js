const catchAsync = require("../utils/catchAsync");
const { createUser, createAccount } = require("../services/auth");

exports.createCustomer = catchAsync(async (req, res, next) => {
  const user = await createUser(req.body);
  const account = await createAccount(req.body, user);

  res.status(201).json({
    status: "success",
    user,
    account,
  });
});
