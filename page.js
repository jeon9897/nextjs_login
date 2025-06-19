'use client';
import Link from 'next/link';
import {useState} from 'react';

export default function RegisterPage(){
  // 변수선언 = 아이디, 패스워드
  const [form, setForm] = useState({
    username:'',
    password:''
  });

  //사용자가 각 입력폼에 입력을 했을때 
  const handleChange =(e)=>{
    setForm({
      ...form, [e.target.name]:e.target.value
    })
  }

  // 사용자가 회원가입 버튼을 클릭하였을 때 호출되는 함수
  const handleSubmit = async e => { //폼내용 전송시 비동기 함수를 사용
    e.preventDefault(); //새로고침 방지

    const res = await fetch('/api/register', { //API주소로 POST방식 요청을 함.
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(form), //form객체를 json문자열로 변환하여 전송을 한다.
    });

    let data = {};
    try {
      data = await res.json();
    } catch (e) {
      data = { message: '서버 응답이 올바르지 않습니다.' };
    }

    if(res.ok){                     //응답이 정상이면 
      alert('회원가입이 완료되었습니다.'); //내용 출력
      setForm({username:'', password:''}) //폼초기화
    }else{                              //응답이 정상이 아니면(실패하면)
      alert(data.message);              //서버가 보낸 메세지를 출력한다.
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <h2>회원가입 페이지</h2>
      <p>
        <label htmlFor="username">아이디 : </label>
        <input type="text" id="username" name="username" placeholder="아이디" required  onChange={handleChange} />
      </p>

      <p>
        <label htmlFor="password">패스워드 : </label>
        <input type="password" id="password" name="password" placeholder="패스워드" required onChange={handleChange}/>
      </p>

      <p>
        <input type="submit" value="가입하기" /> &#10072; &nbsp;
        <Link href="/">홈으로</Link> &#10072; &nbsp;
        <Link href="/login">로그인</Link>
      </p>
    </form>
  )
}