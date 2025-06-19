'use client'; //Next.js 13버전부터 App Router에서 도입된 'client Component'선언문
import Link from 'next/link';
import {useEffect, useState} from 'react';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    //토큰이 있으면 로그인 상태로 간주한다.
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  },[]);

  return (
    <div>
      <header>
        <h1>상단로고</h1>
        <nav>
          {isLoggedIn ? (
            <><Link href='/logout'>로그아웃</Link></>
            
          ) : (
            <>
              <Link href='/login'>로그인</Link> &#10072; &nbsp;
              <Link href='/register'>회원가입</Link>
            </>
          )}         
        </nav>
      </header>

      <main>메인 콘텐츠영역</main>

      <footer>하단 푸터영역</footer>
    </div>
  );
}