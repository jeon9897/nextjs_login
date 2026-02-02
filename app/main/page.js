'use client'; //Next.js 13버전부터 App Router에서 도입된 'client 
import Link from 'next/link';
import {useState, useEffect} from 'react';

function Main(props) {

  //1. 상태변수
  const [IsLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  },[])

  return (
    <main>
      메인영역
      <p>
        {
        IsLoggedIn?(
        <Link href='../logout'>로그아웃</Link>
        ):( 
        <>
          <Link href='../login'>로그인</Link>&nbsp; &#10072; &nbsp;
          <Link href='../register'>회원가입</Link>
        </>
        )}
      </p>
    </main>
  );
}

export default Main;