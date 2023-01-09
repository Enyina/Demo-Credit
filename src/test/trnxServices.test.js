const { withdraw, deposit, checkBalance } = require("../services/transaction");


/*
note all fucntions run with already creadted account numbers 
so create a new one before running tests
*/
describe("deposit test", () => {
  test("should return success", async () => {
    const trnx = await deposit(60009700, 2000);

    expect(trnx).toBe("success");
  });

  test("should not return success", async () => {
    const trnx = await deposit(60009700);

    expect(trnx).not.toBe("success");
  });
});

describe("withdrawal test", () => {
  test("should return success", async () => {
    const trnx = await withdraw(60009700, 2000);

    expect(trnx).toBe("success");
  });

  test("should not return success", async () => {
    const trnx = await withdraw(60009700);

    expect(trnx).not.toBe("success");
  });
});
