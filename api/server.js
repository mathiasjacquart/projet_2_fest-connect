require ('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const port = process.env.PORT || 4000
const userRoutes = require ("./routes/users")
const storageRoutes = require("./routes/storage")

const app = express();
app.use(express.json());
app.use(
    cors({
        origin:"*"
    })
);

app.use("/api/users", userRoutes);
app.use("/api/storage" , storageRoutes)

mongoose
    .connect(process.env.MONGO_URI)
    .then(()=> {
        app.listen(port, () => { 
            console.log(`connected to db and listening on port : ${port}`);
        });
    })
    .catch((err) => console.log(err)) 