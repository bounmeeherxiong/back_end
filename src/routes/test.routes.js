const controller = require("../controllers/test.controller");

module.exports = (app) => {
  app.use((req, res, next) => {
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(`/create-account`, controller.addAccount);
  app.get(`/parents/:id`, controller.getAllParents);
  app.get(`/accounts`, controller.getAllAccounts);
  app.get(`/account-names`, controller.getAccountName);


  app.get('/detail-categories', controller.getDetailCategories)
};
