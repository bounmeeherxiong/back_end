const connection = require("../connections/db");

exports.Create_Currencies = async (req, res) => {
    try {
        const {name,code,rate}=req.body;
        if (!name) {
            return res.status(400).json("Bad Syntax");
        }
        const account = await connection("INSERT INTO tbl_currencies(CurrenciesName,CurrenCode,CurrencyRate,CurrenStatus)VALUES(?,?,?,?)",[name,code,rate,1]);
        return res.status(200).json(account);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
};

exports.getDataCurrencies = async (req, res) => {
    try {
        const account = await connection("SELECT * FROM tbl_currencies;");
        return res.status(200).json(account);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
};

exports.DeletedCurrencies = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json("Bad Syntax");
        }
        const account = await connection("DELETE FROM tbl_currencies WHERE Cureenies_id=?",[id]);
        return res.status(200).json(account);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
};
exports.UpdateCurrencies = async (req, res) => {
    try {
        const { id } = req.params;
        const {name,code,rate}=req.body;
        const account = await connection("UPDATE tbl_currencies SET CurrenciesName=?,CurrenCode=?,CurrencyRate=? WHERE Cureenies_id=?",[name,code,rate,id]);
        return res.status(200).json(account);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
};

