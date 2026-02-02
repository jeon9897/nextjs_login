'use client';
import {useEffect} from 'react';

export default function Logout() {
  useEffect(()=>{
    // 1. localStorage에서 토큰 삭제
    localStorage.removeItem('token');

    // 2. 로그아웃 완료 알림
    alert('로그아웃 되었습니다.');

    // 3. 로그인 페이지로 이동(리다이렉트)
    window.location.href='/';
  },[]); //의존성 배열 비워서 마운트 시 1회만 실행

  return null; //렌더링할 ui 없음    
}