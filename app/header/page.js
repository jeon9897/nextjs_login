'use client'; //Next.js 13버전부터 App Router에서 도입된 'client 
import Image from 'next/image';
import Link from 'next/link';
import {useEffect, useState} from 'react';

function Header() {

  //1. 상태변수 선언
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  //2. 페이지 로딩시 토큰값을 한번만 불러온다.
  useEffect(()=>{
    //토근이 있으면 로그인 상태로 간주한다.
    const token = localStorage.getItem('token');
    //상태함수에 token값을 넣어서
    //토큰이 있으면 로그인 상태 true
    //토근이 없으면 로그인 상태 false
    //!! == 삼항조건연산자
    setIsLoggedIn(!!token);

  },[]);

  return (
    <header>
      <h1>
        {/* 리액트 문법 
        <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="상단로고" /> */
        }

        <Link href='/' title="메인페이지로 이동하기">
        {/* 아래 방법 추천 - next.js에서 이미지 자동 최적화, 로딩속도 향상 */}
          <Image 
            src='/images/logo.png'
            alt="상단로고"
            width={200}
            height={40}
          />
        </Link>

        {/* 일반적인 삽입방법  경로시 ./ 가 아닌 /로만 작성해야 
         <img src='/images/logo.png' alt="상단로고" /> */
        }
      </h1>

      <button onClick={()=>setMenuOpen(!menuOpen)}>
        <i className="fas fa-bars"></i>
      </button>

      {  
      isLoggedIn?
      <>
        <Link href="/logout" title="로그아웃">
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </Link>
      </>
      :
      <>
        <Link href="/login" title="로그인 페이지로 이동하기">
          <i className="fas fa-user"></i>
        </Link>
      </>      
      }

      <nav className="gnb" style={{
        left:menuOpen?'0px':'100%'
      }}>
        <span onClick={()=>setMenuOpen(false)}>
          <i className="fas fa-times"></i>
        </span>
        <ul>
        {isLoggedIn?(
          <>
            <li><Link href='/logout'>로그아웃</Link></li>
          </>
        ):(
          <>
            <li>
              <Link href='../login' onClick={()=>setMenuOpen(false)}>로그인</Link>&nbsp;&nbsp;
              <Link href='../register' onClick={()=>setMenuOpen(false)}>회원가입</Link>
            </li>
          </>
        )}
            <li><Link href='/'>ESPRESSO BAR</Link></li>
            <li><Link href='/'>PASCUCCI</Link></li>
            <li><Link href='/'>MENU</Link></li>
            <li><Link href='/'>NEWS</Link></li>
            <li><Link href='/'>CUSTOMER</Link></li>
            <li><Link href='/'>자주하는 질문</Link></li>
            <li><Link href='/'>1:1문의하기</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;