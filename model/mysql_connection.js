const mysql = require('mysql');
const config = {
    host: "localhost",
    user: "nodejs_user",
    password: "nodejs_user",
    database: "study_schema"
}
const con = mysql.createConnection(config);

function listarClientes(){

    // con.connect(function (err) {
    //     if (err) throw err;
    //     con.query("SELECT * FROM t_cliente", function (err, result, fields) {
    //         if (err) throw err;
    //         console.log(result);
    //         return result;
    //     });
    // });
}

module.exports = { listarClientes };