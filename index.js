require("dotenv").config();
const express = require("express");
const path = require("path");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = process.env.PORT;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json());


// page segregation .. App use statments
app.use('/', require(path.join(__dirname, "/routes/pages/root.js")));


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
    console.log(`App online at - http://localhost:${port}`)
})