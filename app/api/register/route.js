import {db} from '@/lib/db';
import bcrypt from 'bcrypt';

export async function POST(req){
  //1. 변수선언
  const {username, password} = await req.json();

  //2. 넘겨받은 데이터 빈 데이터 없는지...
  if(!username || !password){
    return new Response(JSON.stringify({message:'필수 항목 누락'}),{
      status:400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  
  //서버(/api/register)에서 항상 JSON 응답을 반환하도록 설정해야 합니다.
  //Response 생성 시 반드시 JSON.stringify(...)와 'Content-Type': 'application/json' 헤더를 포함해야

  //3. 넘겨받은 데이터가 일치하는게 있는지
  const [existing] = await db.query(
    'SELECT * FROM users WHERE username=?',
    [username]
  );

  if(existing.length>0){
    return new Response(JSON.stringify({message:'이미 사용중인 사용자입니다.'}),
      {
        status:409,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  //4. 일치하는 데이터가 없다면 쿼리문으로 데이터 입력하여 회원정보추가
  //패스워드 암호화
  const hashedPassword = await bcrypt.hash(password, 10); 

  await db.query(
    'INSERT INTO users (username, password) VALUES (?,?)',
    [username, hashedPassword]
  );

  return new Response(
    JSON.stringify({message:'회원가입이 완료되었습니다.'}),
    {
      status:201,
      headers: { 'Content-Type': 'application/json' },
    }
  );
}
