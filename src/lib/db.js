import mysql from 'mysql2/promise';

//db연결정보
const db = mysql.createPool({
  host:process.env.DB_HOST,
  port:process.env.DB_PORT || 31573,
  user:process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit:10, //연결 최대 수
});

export default db;
