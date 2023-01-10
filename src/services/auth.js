const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const knex = require("../database/db");

const encryptPassword = async (password) => {
  return bcrypt.hash(password, 10);
};

/**
 * creates new user
 * @param {*} data req.body
 * @returns newly created accont
 */
exports.createUser = async (data) => {
  let { name, email, password } = data;
  const id = uuidv4();
  password = await encryptPassword(password);
  await knex("users").insert({
    id,
    name,
    email,
    password,
  });
  const user = await knex.select().where("id", id).from("users");

  return user[0];
};

/**
 * creats new acount for a user
 * @param {*} data res.body
 * @param {*} user new user
 * @returns newly created account
 */
exports.createAccount = async (data, user) => {
  const { acc_num, balance } = data;

  await knex("accounts").insert({
    acc_num,
    balance,
    user_id: user.id,
  });
  const account = await knex
    .select()
    .where("acc_num", acc_num)
    .from("accounts");

  return account[0];
};
