import login from '../../assets/login.png';
import styles from './AuthForm.module.css';
import Input from '../../shared/components/UI/Input/Input';
import Button from '../../shared/components/UI/Button';

import { RiUserLine, RiLockPasswordLine } from 'react-icons/ri';
import { MdAlternateEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(false);

    const switchAuthModeHandler = () => {
        setIsLogin(!isLogin)
    }

    return (
        <div className='h-full flex justify-center items-center'>
            <div className='mx-auto w-1/2 rounded-lg flex flex-col justify-center items-center shadow-2xl bg-slate-800'>
                <div className={`${styles.container} border-b border-slate-700`}>
                    <img className='rounded-t-lg' src={login} alt='login' />
                </div>
                
                
                <div className='flex flex-col justify-center items-center text-white my-5'>
                    <h1 className='text-xl mb-5'>
                        {isLogin ? 'USER SIGNUP' : 'USER LOGIN'}
                    </h1>

                    <Input 
                        icon={<MdAlternateEmail/>}
                        iconClass='top-2.5 left-2.5'
                        className='bg-gray-900 mb-5 border border-slate-700 rounded-3xl p-1 pr-4 pl-8' 
                        style={{width: '20rem'}}
                        type='email'
                        placeholder='email'
                    />
                    
                    {
                        isLogin && 
                        <Input 
                            icon={<RiUserLine />}
                            iconClass='top-2.5 left-2.5'
                            className='bg-gray-900 mb-5 border border-slate-700 rounded-3xl p-1 pr-4 pl-8' 
                            style={{width: '20rem'}}
                            type='text'
                            placeholder='name'
                        />
                    }
                    
                    <Input 
                        icon={<RiLockPasswordLine />}
                        iconClass='top-2.5 left-2.5'
                        className='bg-gray-900 mb-5 border border-slate-700 rounded-3xl p-1 pr-4 pl-8' 
                        style={{width: '20rem'}}
                        type='password' 
                        placeholder='password'
                    />

                    <Button
                        className='text-slate-500 mb-5 hover:text-slate-400'
                        onClick={switchAuthModeHandler}
                        type='button'
                    >
                        {isLogin ? 'Already have an account?' : "Don't have an account?"}
                    </Button>

                    <Link
                        to='/all-boards'
                        className='rounded-3xl px-6 py-2 text-white bg-gradient-to-r from-rose-600 to-indigo-900 hover:from-rose-500 hover:to-indigo-800 text-black font-bold'
                    >
                        {isLogin ? 'SIGNUP' : 'LOGIN'}
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default AuthForm;