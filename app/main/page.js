'use client'; //Next.js 13버전부터 App Router에서 도입된 'client 
import '../css/main.css';

function Main(props) {
  return (
    <main>
      <section className="slide">
        <img src='/images/slide1.jpg' alt="메인배너" />
      </section>
    </main>
  );
}

export default Main;