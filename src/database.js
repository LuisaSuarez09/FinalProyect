import { createPool } from "mysql2/promise";


const pool = createPool({
    host: 'localhost',
    port: '3306',
    user: 'pruebafinal',
    password: 'pruebafinal',
    database: 'pruebafinal'

});

export default pool;
