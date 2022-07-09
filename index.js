const express = require("express");
const cors = require("cors");

const app=express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello Wolrd" });
});

require('./src/routes/Currencies.routes')(app);
require('./src/routes/category.routes')(app);
require('./src/routes/account.routes')(app);

const PORT = process.env.PORT || 81;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});