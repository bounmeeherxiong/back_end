const controller = require('../controllers/Category.controller');
module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            "Access-Control-Allow-Headers",
            "Authorization, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(`/Create_Category`,controller.Create_Category);
    app.get(`/getType`,controller.getDataType);
    app.get(`/getCategory`,controller.getDateCategory);
    app.delete(`/deletedCategory/:id`,controller.deletedCategory);
    app.post(`/createdataCategoryDetail`,controller.CreateDetailCategory);
    app.get(`/getCategoryDetail`,controller.getCreategoryDetail);
    app.delete(`/deletedCategoryDetail/:id`,controller.deleteCategoryDetail);
    app.get('/detailCategory', controller.getDetailCategories);
    app.get(`/showdetailCategory/:type`,controller.getdetailshow);

};