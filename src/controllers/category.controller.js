const connection = require("../connections/db");

exports.Create_Category = async (req, res) => {
    try {
        const {Type_id,Category_name,CreteDate,CreateStatus}=req.body;
        if (!Type_id) {
            return res.status(400).json("Bad Syntax");
        }
        const account = await connection("INSERT INTO tb_category(Type_id,Category_name,CreteDate,CreateStatus)VALUES(?,?,?,?)",[Type_id,Category_name,CreteDate,CreateStatus]);
        return res.status(200).json(account);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
};
exports.CreateDetailCategory = async (req, res) => {

    try {
        const {Category_id,DetailType}=req.body;
        if (!Category_id) {
            return res.status(400).json("Bad Syntax");
        }
        const account = await connection("INSERT INTO tb_detailcategory(Category_id,DetailType)VALUES(?,?)",[Category_id,DetailType]);
        return res.status(200).json(account);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
};

exports.getDataType = async (req, res) => {
    try {
        const account = await connection("SELECT * FROM tb_type;");
        return res.status(200).json(account);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
};
exports.getCreategoryDetail = async (req, res) => {
    try {
        const account = await connection("SELECT a.Detail_id,a.DetailType,b.Category_id,b.Category_name FROM tb_detailcategory a INNER JOIN tb_category b ON b.Category_id=a.Category_id");
        return res.status(200).json(account);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
};

exports.getDateCategory = async (req, res) => {
    try {
        const account = await connection("SELECT a.Category_id,a.Category_name,a.CreteDate,b.Type_id,b.Type_name FROM tb_category a INNER JOIN tb_type b ON b.Type_id=a.Type_id");
        return res.status(200).json(account);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
};
exports.deletedCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json("Bad Syntax");
        }
        const account = await connection("DELETE FROM tb_category WHERE Category_id=?",[id]);
        return res.status(200).json(account);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
};
exports.deleteCategoryDetail = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json("Bad Syntax");
        }
        const account = await connection("DELETE FROM tb_detailcategory WHERE Detail_id=?",[id]);
        return res.status(200).json(account);
    }
    catch (err) {
        return res.status(404).json({ message: err });
    }
};

exports.getDetailCategories = async (req, res) => {
    try {
      const name = await connection("SELECT d.*, c.Category_name FROM `tb_detailcategory` d inner join tb_category c on c.Category_id = d.Category_id");
      return res.status(200).json({message: name});
    } catch (error) {
      return res.status(404).json({ message: "error" });
    }
  };

  exports.getdetailshow = async (req, res) => {
    try {
      const {type} = req.params;
     

      const catetory = await connection("SELECT * FROM `tb_detailcategory` WHERE Category_id=?",[type]);
      return res.status(200).json(catetory);
    } catch (error) {
      return res.status(404).json({ message: "error1" });
    }
  };

  