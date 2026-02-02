import mysql from 'mysql2/promise';

//db연결정보
export const db = mysql.createPool({
  host:process.env.DB_HOST,
  port:Number(process.env.DB_PORT),
  user:process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  connectionLimit:10, //연결 최대 수
});

