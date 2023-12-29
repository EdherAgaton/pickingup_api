//conexion a postgres

const {Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: "qwerty",
    database: "db_cash_picking_app",
    port: 5432
})


module.exports = {
    pool
}
