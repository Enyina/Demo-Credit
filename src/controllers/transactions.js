const {
  withdraw,
  deposit,
  checkBalance,
  createTransaction,
  createTransferTransaction,
} = require("../services/transaction");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const sendRes = (res, statusCode, balance, transaction) => {
  res.status(statusCode).json({
    status: "success",
    balance,
    transaction,
  });
};

exports.creditAccount = catchAsync(async (req, res, next) => {
  const { amount, acc_num } = req.body;
  await deposit(acc_num, amount);
  const transaction = await createTransaction(acc_num, amount);

  const bal = await checkBalance(acc_num);

  if (!bal) {
    next(new AppError("error fetching try again later!"));
  }

  sendRes(res, 200, bal, transaction);
});

exports.withdrawal = catchAsync(async (req, res, next) => {
  const { amount, acc_num } = req.body;
  await withdraw(acc_num, amount);
  const transaction = await createTransaction(acc_num, amount);

  const bal = await checkBalance(acc_num);

  if (!bal) {
    next(new AppError("error fetching try again later!"));
  }

  sendRes(res, 200, bal, transaction);
});

exports.sendFunds = catchAsync(async (req, res, next) => {
  const { amount, src_acc, dest_acc } = req.body;
  await withdraw(src_acc, amount);
  await deposit(dest_acc, amount);
  const transaction = createTransferTransaction(src_acc, dest_acc, amount);
  const bal = await checkBalance(src_acc);

  if (!bal) {
    next(new AppError("error fetching try again later!"));
  }

  sendRes(res, 200, "success", bal, transaction);
});