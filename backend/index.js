    const express = require('express');
    const DatabaseClient = require('./utils/database')
    const userRoutes = require("./routes/user");
    const eventRoutes = require("./routes/events");
    const actionRoutes = require("./routes/actions");
    const dotenv = require('dotenv');
    const cors = require('cors');
    const path = require('path');
    const https = require('https');

    dotenv.config();

    const app = express();

    app.use(cors());

    app.use(express.static('public', { extensions: ['html'] }));
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    app.use(express.json());

    app.use('/user', userRoutes); 
    app.use('/events', eventRoutes); 
    app.use('/action', actionRoutes); 

    const sslOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/maisecultura.com.br/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/maisecultura.com.br/fullchain.pem')
};

https.createServer(sslOptions, app).listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Backend rodando em https://localhost:${process.env.PORT}`);
});