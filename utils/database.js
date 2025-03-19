const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

class DatabaseClient {

    constructor() {
        this.connection = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        })

        this.conectar();
    }

    conectar() {
        this.connection.getConnection((err, connection) => {
            if (err) {
                console.log(new Date().toLocaleDateString(), 'Conexão falhou: ' + err.stack);
                return;
            }

            this.connection.on('error', (err) => {
                console.error(new Date().toLocaleTimeString(), 'Erro no banco de dados:', err);
                if (err.code === 'PROTOCOL_CONNECTION_LOST' || err.code === 'ETIMEDOUT'|| err.code === 'ECONNRESET') {
                    this.conectar(); 
                } else {
                    throw err;
                }
            });


        })
    }

    fechar() {
        this.connection.end((err) => {
            if (err) {
                console.error('Erro ao fechar a conexão:', err);
            } else {
                console.log('Conexão encerrada com sucesso.');
            }
        });
    }

    executar(query, params = []){
        return new Promise((resolve, reject) => {
            this.connection.query(query, params, (err, result) => {
                if (err) {
                    console.log(new Date().toLocaleDateString(), 'Erro ao executar SQL', err);
                    reject(err);
                } else {
                    console.log(new Date().toLocaleTimeString(), 'SQL executado com sucesso');
                    resolve(result);
                }
            })
        })

    }

}

module.exports = DatabaseClient;