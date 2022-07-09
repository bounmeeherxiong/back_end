const controller = require('../controllers/account.corntrollers');
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(`/CreateAccount`,controller.CreateAccount);



};