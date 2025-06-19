'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginPage(){

  // 1. 상태변수 선언과 초기값 설정
  const [form, setForm] = useState({
    username:'',
    password:''
  });

  //2. 사용자가 입력양식에 데이터를 입력하면 변수에 각각 담는다.
  const handleChange=(e)=>{
    setForm({...form, [e.target.name]:e.target.value});
  };

  //3. 사용자가 로그인 버튼 클릭시 아이디, 패스워드 비동기로 api로 넘기기
  const handleSubmit= async (e)=>{
    e.preventDefault();
    const res = await fetch('/api/login',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json', // ✅ 이거 추가 필요 Content-Type을 지정하지 않으면 Next.js API Route에서 req.body를 파싱하지 못해 undefined가 될 수 있어요.
      },
      body:JSON.stringify(form),
    });

    const data = await res.json();
    if(res.ok){
      alert('로그인 성공!');
      //토큰 저장하기
      localStorage.setItem('token', data.token); // ⬅️ 토큰 저장

      //메인페이지로 이동하기
      window.location.href='/';
    }else{
      alert(data.message || '로그인 실패');
    }
  };
  
  return(
    <section>
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">아이디 : </label>
          <input type="text" id="username" name="username" onChange={handleChange} placeholder="아이디" required />
        </p>
        <p>
          <label htmlFor="password">패스워드 : </label>
          <input type="password" id="password" name="password" onChange={handleChange}placeholder="패스워드" required />
        </p>

        <p>
          <input type="submit" value="로그인" />
        </p>

        <Link href="/idsearch">아이디 찾기</Link> &#10072; &nbsp;
        <Link href="/pwsearch">비번 찾기</Link> &#10072; &nbsp;
        <Link href="/register">회원가입</Link>
      </form>
    </section>
  );
}