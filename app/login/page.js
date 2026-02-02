'use client'; //Next.js 13버전부터 App Router에서 도입된 'client 
import Link from 'next/link';
import {useState} from 'react';

function LoginPage() {
  
  //1. 
  const [form, setForm] = useState({
    username:'',
    password:''
  });

  //2. 
  const handleChange =(e)=>{
    setForm({
      ...form, [e.target.name]:e.target.value
    })
  };

  //3. 
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const res = await fetch('/api/login', {
      method:'POST',
      headers:{
        'Content-Type' : 'application/json',
      },
      body:JSON.stringify(form),
    });

    //const data = await res.json();
    let data = {};
    try {
      data = await res.json();
    } catch {
      data = { message: '서버 응답 오류' };
    }

    if(res.ok){
      alert('로그인 성공!');
      //토큰 저장하기
      localStorage.setItem('token', data.token);

      window.location.href='/'
    }else{
      alert(data.message||'로그인 실패');
    }
  }; 

  return (
    <section>
      <h2>로그인 폼</h2>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="username">아이디 : </label>
          <input type="text" id="username" name="username" onChange={handleChange} value={form.username} placeholder='아이디' required />
        </p>
        <p>
          <label htmlFor="password">패스워드 : </label>
          <input type="password" id="password" name="password" onChange={handleChange} value={form.password} placeholder='패스워드' required />
        </p>

        <p>
          <input type="submit" value="로그인" />
        </p>

        <Link href="/idsearch">아이디 찾기</Link> &#10072; &nbsp;
        <Link href="/pwsearch">비번찾기 찾기</Link> &#10072; &nbsp;
        <Link href="/register">회원가입</Link>
      </form>
    </section>
  );
}

export default LoginPage;