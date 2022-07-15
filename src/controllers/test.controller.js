const connection = require("../connections/db");
const moment = require("moment");

exports.addAccount = async (req, res) => {
  try {
    const { account_type, fullname, detail_type, description, parent_id } =
      req.body;
    /***Insert Code should be below */
    const account = await connection(
      "INSERT INTO `tb_account_test`(`account_type`, `fullname`, `detail_type`, `description`, `parent_id`) VALUES (?,?,?,?,?)",
      [account_type, fullname, detail_type, description, parent_id]
    );

    await connection(
      "UPDATE tb_account_test SET has_child = 1 WHERE id = ?",
      parent_id
    );

    return res.status(200).json({ message: account });
  } catch (error) {
    return res.status(404).json({ message: "error" });
  }
};

exports.getAllParents = async (req, res) => {
  try {
    const { id: selectedId } = req.params;
    /*** get parents here */

    const parent = await connection(
      "select * from tb_account_test where fullname = ?",
      [selectedId]
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
        "select * from tb_account_test where id = ?",
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
      "select * from tb_account_test where parent_id = ?",
      [0]
    );

    if (firstFloor.length === 0) {
      return res.status(200).json({ message: "empty" });
    }

    const children = await connection(
      "select * from tb_account_test where parent_id <> ?",
      [0]
    );

    return res.status(200).json({ message: firstFloor, children: children });
  } catch (error) {
    return res.status(404).json({ message: "error" });
  }
};

exports.getAccountName = async (req, res) => {
  try {
    const name = await connection("select id, fullname from tb_account_test");
    const nameList = [];
    name.map((data) => {
      let singleData = {};
      singleData.label = data.fullname;
      singleData.id = data.id;

      nameList.push(singleData);
    });
    return res.status(200).json({ message: nameList });
  } catch (error) {
    return res.status(404).json({ message: "error" });
  }
};

exports.getDetailCategories = async (req, res) => {
  try {
    const name = await connection("SELECT d.*, c.Category_name FROM `tb_detailcategory` d inner join tb_category c on c.Category_id = d.Category_id");
    return res.status(200).json({ message: name });
  } catch (error) {
    return res.status(404).json({ message: "error" });
  }
};
