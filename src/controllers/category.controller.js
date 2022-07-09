const connection = require("../connections/db");

exports.createCategory = async (req, res) => {
    try {
        const {Type_id,CategoryName,AccountingCode,Statu}=req.body;
        const category = await connection("INSERT INTO tbl_categories(Type_id,CategoryName,AccountingCode,Statu)VALUES(?,?,?,?)",[Type_id,CategoryName,AccountingCode,Statu]);
        return res.status(200).json(category);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
};
