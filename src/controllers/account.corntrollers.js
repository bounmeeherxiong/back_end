const connection = require("../connections/db");
const moment = require("moment");

exports.CreateAccount = async (req, res) => {
  try {
    const NOW = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    const {
      Type_id,
      Account_laos,
      Account_eng,
      CodeAccount_Number,    
      CreateStatus
    } = req.body;
    const products = await connection(
      "INSERT INTO tbl_account(Type_id,Account_laos,Account_eng,CodeAccount_Number,CreateDate,CreateStatus)VALUES(?,?,?,?,?,?)",
      [
        Type_id,
        Account_laos,
        Account_eng,
        CodeAccount_Number,
        NOW,
        CreateStatus,
      ]
    );
    const { id } = products;

  } catch (err) {
    return res.status(404).json({ message: err });
  }
};
