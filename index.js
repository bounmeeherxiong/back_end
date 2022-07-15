const express = require("express");
const cors = require("cors");

const app=express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.status(200).json({ message: "Hello Wolrd" });
});

require('./src/routes/Category.routes')(app);
require('./src/routes/test.routes')(app);
require('./src/routes/ChartAccount.routes')(app);


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});