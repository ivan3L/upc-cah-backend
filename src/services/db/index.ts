import {Pool} from 'pg';

let pool = new Pool({
    user: 'admin_123',
    password: 'admin_123',
    host: 'database-cah.ca1uzo1y5e8b.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'dbcahupc',
    max: 20,
    idleTimeoutMillis: 30000,
    ssl: {
        rejectUnauthorized: false, // en caso de que la conexión requiera certificados SSL, debes indicarlo aquí
      },
})

pool.query("Select Now()")
    .then(() => console.log("Conectado a la base de datos"))
    .catch(err => {
        console.log(err)
    })

export default pool