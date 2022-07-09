const controller = require('../controllers/category.controller');
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(`/createCategory`,controller.createCategory);

    



};