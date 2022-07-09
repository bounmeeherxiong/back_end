const controller = require('../controllers/Currencies.controller');
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(`/Create_Currency`,controller.Create_Currencies);
    app.get(`/getDateCurrency`,controller.getDataCurrencies);
    app.delete(`/DeleteCurrency/:id`,controller.DeletedCurrencies);

    
};