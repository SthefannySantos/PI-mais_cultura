    const express = require('express');
    const DatabaseClient = require('./utils/database')
    const userRoutes = require("./routes/user");
    const eventRoutes = require("./routes/events");
    const actionRoutes = require("./routes/actions");
    const dotenv = require('dotenv');
    const cors = require('cors')

    dotenv.config();

    const app = express();

    app.use(cors());

    app.use(express.static('public', { extensions: ['html'] }));

    app.use(express.json());

    app.use('/user', userRoutes); 
    app.use('/events', eventRoutes); 
    app.use('/action', actionRoutes); 

    app.listen(process.env.PORT, '0.0.0.0', () => {
        console.log(`Server rodando em http://localhost:${process.env.PORT}`)
    })
