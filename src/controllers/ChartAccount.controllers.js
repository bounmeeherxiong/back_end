const connection = require("../connections/db");

exports.CreateChartAccount = async (req, res) => {
    try {
        const {Category_id,DetailCategory_id,ChartAccountName,CreateDate,CreateStutus,Employee,Company_id}=req.body;
        if (!Category_id) {
            return res.status(400).json("Bad Syntax");
        }
        const account = await connection("INSERT INTO tb_category(Category_id,DetailCategory_id,ChartAccountName,CreateDate,CreateStutus,Employee,Company_id)VALUES(?,?,?,?,?,?,?)",[Category_id,DetailCategory_id,ChartAccountName,CreateDate,CreateStutus,Employee,Company_id]);
        return res.status(200).json(account);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
};