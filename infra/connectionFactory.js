const mysql = require('mysql');
class MySqlDatabase {

    static get configMySQL() { 
        const valor = {
            host: "localhost",
            user: "nodejs_user",
            password: "nodejs_user",
            database: "study_schema"
        }
        return valor
    }
    
    constructor(config) {
        this.connection = mysql.createConnection(config);
    }
    query(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, args, (err, rows) => {
                if (err)
                    return reject(err);
                resolve(rows);
            });
        });
    }

    insert(sql, args) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, (err, result) => {
                if (err)
                    return reject(err);
                console.log('Objeto inserido com sucesso')
                resolve();
            });
        });
    }
    close() {
        return new Promise((resolve, reject) => {
            this.connection.end(err => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }

    isConnected() {
        console.log('Checking connection...')
        if(this.connection.isConnected)
            console.log('Connection is OK')
        else
            console.log('Connection is BROKED!!!')
    }
}

module.exports = MySqlDatabase;