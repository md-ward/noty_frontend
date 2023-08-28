import React, { useState , useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import background from '/assets/background/bg3.jpg';
import SignUpForm from '../widgets/sign_up_form';
import SplitType from 'split-type';
import LoginForm from '../widgets/login_form';

function Register() {

  const [isLogin, setisLogin] = useState(true);
  const textRef = useRef(null);
  // ! Text animation ....

  useLayoutEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    if (window.innerWidth < 600) {
      tl.kill()
    }
    if (isLogin) {
      tl.pause()
    }
    else {
      tl.play()
    }


    tl.fromTo(
      '#wellcome',
      { opacity: 0, fontSize: 0, skewY: 10, },
      { opacity: 1, fontSize: 48, x: 100, duration: 1, skewY: 0 }
    )
      .fromTo('#tool', { opacity: 0, fontSize: 0 }, { opacity: 1, fontSize: 28, duration: 0.5, x: 100 })
      .fromTo('#st1', { opacity: 0, fontSize: 0 }, { opacity: 1, fontSize: 28, duration: 0.5, x: 100 })
      .fromTo('#st2', { opacity: 0, fontSize: 0 }, { opacity: 1, fontSize: 28, duration: 0.5, x: 100 })
      .fromTo('#st3', { opacity: 0, fontSize: 0 }, { opacity: 1, fontSize: 28, duration: 0.5, x: 100 })
      .fromTo('#st4', { opacity: 0, fontSize: 0 }, { opacity: 1, fontSize: 28, duration: 0.5, x: 100 })
      .fromTo('#between', { opacity: 0, fontSize: 0 }, { opacity: 1, fontSize: 28, duration: 0.5, x: 100 })
      .fromTo('#what', { opacity: 0, fontSize: 0 }, { opacity: 1, fontSize: 28, duration: 0.5, x: 100 })
    // .fromTo('#reg', { opacity: 0, fontSize: 0 }, { opacity: 1, fontSize: 38, duration: 0.5, x: 100 });
    const ourText = new SplitType('#reg', { types: 'chars' })
    const chars = ourText.chars
    tl.fromTo(
      chars,
      {
        y: 100,
        opacity: 0,

        backgroundColor: 'transparent'
      },
      {
        y: 0,

        opacity: 1,
        stagger: 0.05,
        duration: 2,

        backgroundColor: 'white'
        ,


        ease: 'power4.out',
        onComplete: () => {
          ourText.revert()
          let reg = document.querySelector('#reg');
          reg.style.backgroundColor = 'white'

        }

      }

    )

    // Additional animations can be added here

  }, [isLogin]);







  return (

    <div className='min-h-screen w-full flex flex-row relative font-sans'>
      {/* background */}
      <img src={background} className='w-full fixed inset-0 h-full object-cover blur-sm z-0' />
      {!isLogin ? <span
        ref={textRef}
        id='all'
        className='hidden font-serif select-none text-3xl mr-2 text-dark-blue sm:flex flex-col justify-center w-1/2 gap-8 fixed aspect-square  h-full z-10'
      >
        <h1 id='wellcome'>Welcome to Noty</h1>
        <h1 id='tool' className='bg-transparent roundf'>a new tool to keep your notes</h1>
        <span className='flex flex-row gap-2'>
          <p id='st1'>organized</p>
          <p id='st2'>styled</p>
          <p id='st3'>and</p>
          <p id='st4'>synced</p></span>
        <h2 id='between'>between all your devices</h2>
        <h2 id='what'>what are you waiting for</h2>
        <h1 id='reg' className='relative w-fit rounded-md transition-all duration-200 ease-in-out' style={{ marginLeft: 100 }}>Register now</h1>
      </span>

        : <span></span>
      }
      {isLogin ?
        <LoginForm setIsLogin={setisLogin} ></LoginForm>
        :
        <SignUpForm setIsLogin={setisLogin} />


      }
    </div>
  );
}

export default Register;