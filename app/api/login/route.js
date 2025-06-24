import db from '@/lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req){
  const {username, password} = await req.json();
  const SECRET_KEY = 'test';

  //사용자 아이디가 있는지 조회를 한다.
  const [users] = await db.query('SELECT * FROM users WHERE username=?', [username]);

  if(users.length===0){ //일치하는 사용자가 없다면
    return new Response(JSON.stringify({message:'존재하는 아이디가 없습니다.'}), {status:404});
  }

  //일치하는 사용자가 있다면
  const user = users[0];

  //패스워드 검사
  const isMatch = await bcrypt.compare(password, user.password);

  if(!isMatch){
    return new Response(JSON.stringify({message:'비밀번호가 일치하지 않습니다. 다시 확인하세요.'}),{
      status:401
    });
  }

  //아이디, 패스워드가 맞으면 토큰생성하기
  const token = jwt.sign({id:user.id, username:user.username}, SECRET_KEY,{expiresIn:'1h'});

  return new Response(JSON.stringify({token}), {status:200});

}
