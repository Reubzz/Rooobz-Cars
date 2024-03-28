require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require('cookie-parser');

const port = process.env.PORT;
const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.json({ limit: '100mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '100mb', extended: true }))


// page segregation .. App use statments
app.use('/', require(path.join(__dirname, "/routes/pages/root.js")));
app.use('/api/components', require(path.join(__dirname, "/routes/api/components.js")));
app.use('/api/auth', require(path.join(__dirname, "/routes/api/authentication.js")));
app.use('/api/cars', require(path.join(__dirname, "/routes/api/cars.js")));
app.use('/api/subscribe', require(path.join(__dirname, "/routes/api/email-subscribe.js")));
app.use('/api/account', require(path.join(__dirname, "/routes/api/account.js")));
app.use('/api/booking', require(path.join(__dirname, "/routes/api/booking.js")));
app.use('/api/invoice', require(path.join(__dirname, "/routes/api/invoice.js")));
app.use('/api/transaction', require(path.join(__dirname, "/routes/api/transaction.js")));
app.use('/api/reviews', require(path.join(__dirname, "/routes/api/reviews.js")));


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
    console.log(`App online at - http://localhost:${port}`)
})