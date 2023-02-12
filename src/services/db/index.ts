import {Pool} from 'pg';

let pool = new Pool({
    user: 'intcouriersusr',
    password: 'PRmZzvH39JP7JxKx',
    host: 'localhost',
    port: 5434,
    database: 'db_card',
    max: 20,
    idleTimeoutMillis: 30000
})

pool.query("Select Now()")
    .then(() => console.log("Conectado a la base de datos"))
    .catch(err => {
        console.log(err)
    })

export default pool