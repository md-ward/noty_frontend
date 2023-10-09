import { useState } from 'react';

import SignUpForm from '../widgets/sign_up_form';
import LoginForm from '../widgets/login_form';

function Register() {
  const [isLogin, setisLogin] = useState(true);





  return (
    <div className="min-h-screen grid grid-cols-12 font-sans items-center bg-gradient-to-b from-indigo-500 to-blue-500 overflow-hidden">
      <img src="assets/victors/add-notes-animate.svg" loading='lazy' alt=" login animation" className="max-sm:hidden sm:col-span-6" />
      <div className='col-span-12 p-4 sm:col-span-5 flex flex-col '>

        <div className="glitch-wrapper">
          <div className="glitch sm:hidden" data-glitch="wellcome to Noty">wellcome to Noty</div>
        </div>
        {isLogin ? (
          <LoginForm setIsLogin={setisLogin}></LoginForm>
        ) : (
          <SignUpForm setIsLogin={setisLogin} />
        )}

      </div>
    </div>
  );
}

export default Register;