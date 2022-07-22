const controller = require('../controllers/ChartAccount.controllers');
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post(`/CreateChartAccount`,controller.CreateChartAccount);
    app.get(`/Allparents/:id`, controller.getAllParents);
    app.get(`/Accountnames`, controller.getAccountName);
    app.get(`/Allaccounts`, controller.getAllAccounts);

};