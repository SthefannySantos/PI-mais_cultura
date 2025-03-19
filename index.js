    const express = require('express');
    const DatabaseClient = require('./utils/database')
    const userRoutes = require("./routes/user");
    const dotenv = require('dotenv');

    dotenv.config();

    const app = express();

    app.use(express.json());

    app.use('/user', userRoutes); 

    app.listen(process.env.PORT, () => {
        console.log('Server rodando porta 3000')
    })
