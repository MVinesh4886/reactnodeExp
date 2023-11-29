const express = require("express");
const userRoute = require("./routes/usersRoute");
const transactionRoute = require("./routes/transactionsRoute");
require("dotenv").config();
require("./config/database");

const app = express();

app.use(express.json());
app.use("/api/users/", userRoute);
app.use("/api/transactions/", transactionRoute);
const port = 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
