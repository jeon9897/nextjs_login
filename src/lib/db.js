import mysql from 'mysql2/promise';

//db연결정보
const pool = mysql.createPool({
  host:'database',
  user:'root',
  password:'1234',
  database:'kdt',
  waitForConnections:true, //연결 개수가 풀일 때 기다리게... 
  connectionLimit:10, //연결 최대 수
  queueLimit:0, //대기 요청수 '0'이면 무제한
});

export const db = pool;
