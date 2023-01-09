const knex = require("../db/db");
const { v4: uuidv4 } = require("uuid");
const AppError = require("../utils/AppError");

exports.createTransaction = async (acc_num, amount) => {
  const id = uuidv4();
  await knex.transaction(async (trx) => {
    await knex("transactions")
      .insert({
        id,
        src_id: acc_num,
        amount,
        status: "successful",
      })
      .transacting(trx)
      .then(trx.commit)
      .catch(trx.rollback);
  });
  return await knex.select().where("id", id).from("transactions");
};
exports.createTransferTransaction = async (src_acc, dest_acc, amount) => {
  const id = uuidv4();
  await knex.transaction(async (trx) => {
    await knex("transactions")
      .insert({
        id,
        src_id: src_acc,
        dest_id: dest_acc,
        amount,
        status: "successful",
      })
      .transacting(trx)
      .then(trx.commit)
      .catch(trx.rollback);
  });
  return await knex.select().where("id", id).from("transactions");
};

/**
 * Deposits to account
 * @param {*} acc_num takes account to be credited
 * @param {*} amount takes amout to be deposited from the  body
 * @returns the transaction details
 */
exports.deposit = async (acc_num, amount) => {
  if (!acc_num) {
    return new AppError("input account number", 400);
  }
  if (!amount) {
    return new AppError("input amount to deposit", 400);
  }
  const account = await knex
    .select()
    .where("acc_num", acc_num)
    .from("accounts");

  knex.transaction(async (trx) => {
    const newBal = account[0].balance + amount;

    await knex("accounts")
      .where("acc_num", acc_num)
      .update({ balance: newBal })
      .transacting(trx)
      .then(trx.commit)
      .catch(trx.rollback);
  });

  return "success";
};

/**
 * Withdraws from account
 * @param {*} acc_num takes account to be debited
 * @param {*} am' takes amout to be withdrawn from the  body
 * @returns the transaction details
 */

exports.withdraw = async (acc_num, amount) => {
  if (!acc_num) {
    return new AppError("input account number", 400);
  }
  if (!amount) {
    return new AppError("input amount to withdraw", 400);
  }

  const account = await knex
    .select()
    .where("acc_num", acc_num)
    .from("accounts");
  if (account[0].balance < amount) {
    new AppError("insufficient funds", 400);
  }
  knex.transaction(async (trx) => {
    const newBal = account[0].balance - amount;
    await knex("accounts")
      .where("acc_num", acc_num)
      .update({ balance: newBal })
      .transacting(trx)
      .then(trx.commit)
      .catch(trx.rollback);
  });

  return "success";
};

/**
 *  Gets account balance
 * @param {*} acc_num takes the account to be queried
 * @returns account banlance
 */
exports.checkBalance = async (acc_num) => {
  if (!acc_num) {
    return new AppError("input account number", 400);
  }

  const account = await knex
    .select()
    .where("acc_num", acc_num)
    .from("accounts");
  return account[0].balance;
};
