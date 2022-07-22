const connection = require("../connections/db");
exports.CreateChartAccount = async (req, res) => {
  try {

    const {
      Category_id,
      DetailCategory_id,
      ChartAccountName,
      CreateDate,
      Employee,
      Company_id,
      Description,
      parent_id,
    } = req.body;
    /***Insert Code should be below */
    const account = await connection(
      "INSERT INTO tb_chartaccounts(Category_id,DetailCategory_id,ChartAccountName,CreateDate,Employee,Company_id,Description,parent_id) VALUES (?,?,?,?,?,?,?,?)",
      [
        Category_id,
        DetailCategory_id,
        ChartAccountName,
        CreateDate,
        Employee,
        Company_id,
        Description,
        parent_id,
      ]
    );
    await connection(
      "UPDATE tb_chartaccounts SET has_child = 1 WHERE Account_id = ?",
      parent_id
    );
    return res.status(200).json({ message: account });
  } catch (error) {
    return res.status(404).json({ message: "error" });
  }
};
exports.getAllParents = async (req, res) => {
  try {
    const { id: selectedname } = req.params;
    /*** get parents here */
    const parent = await connection(
      "SELECT * FROM tb_chartaccounts where Account_id = ?",
      [selectedname]
    );
    if (parent.length === 0) {
      return res.status(200).json({ message: "empty" });
    }
    let parentsList = [];
    const { parent_id } = parent[0];
    parentsList.push(parent[0]);
    let parent_id_checking = parent_id;
    for (let i = 0; i < 15; i++) {
      const parent = await connection(
        "select * from tb_chartaccounts where Account_id = ?",
        [parent_id_checking]
      );
      if (parent.length > 0) {
        parentsList.push(parent[0]);
        const { parent_id } = parent[0];
        parent_id_checking = parent_id;
      }
    }
    return res.status(200).json({ message: parentsList });
  } catch (error) {
    return res.status(404).json({ message: "error" });
  }
};

exports.getAllAccounts = async (req, res) => {
  try {
    /*** get accounts query */
    const firstFloor = await connection(
      "SELECT a.Account_id,a.ChartAccountName,a.Description,a.Balance,b.Category_id,b.Category_name,c.Detail_id,c.DetailType FROM tb_chartaccounts a INNER JOIN tb_category b ON b.Category_id=a.Category_id INNER JOIN tb_detailcategory c ON c.Detail_id=a.DetailCategory_id WHERE a.parent_id=?",
      [0]
    );
    // if (firstFloor.length === 0) {
    //   return res.status(200).json({ message: "empty" });
    // }
    const children = await connection(
      "SELECT a.Account_id,a.ChartAccountName,a.Description,a.parent_id,a.Balance,c.Detail_id,c.DetailType,b.Category_id,b.Category_name FROM tb_chartaccounts a INNER JOIN tb_category b ON b.Category_id=a.Category_id INNER JOIN tb_detailcategory c ON c.Detail_id=a.DetailCategory_id where a.parent_id <> ?",
      [0]
    );
    return res.status(200).json({ message: firstFloor, children: children });
  } catch (error) {
    return res.status(404).json({ message: "error" });
  }
};
exports.getAccountName = async (req, res) => {
  try {
    const name = await connection(
      "SELECT Account_id, ChartAccountName FROM tb_chartaccounts"
    );
    const nameList = [];
    name.map((data) => {
      let singleData = {};
      singleData.label = data.ChartAccountName;
      singleData.id = data.Account_id;
      nameList.push(singleData);
    });
    return res.status(200).json({ message: nameList });
  } catch (error) {
    return res.status(404).json({ message: "error" });
  }
};
