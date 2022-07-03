// import login from '../../assets/login.png';
// import styles from './AuthForm.module.css';
import Input from '../../shared/components/UI/Input/Input';
import Button from '../../shared/components/UI/Button';

import { RiUserLine, RiLockPasswordLine } from 'react-icons/ri';
import { MdAlternateEmail } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(false);

	const switchAuthModeHandler = () => {
		setIsLogin(!isLogin);
	};

	return (
		<div className='flex flex-col justify-center items-center my-20 py-5 border-y'>
			<h1 className='text-2xl font-bold mb-5 text-blue-600'>
				{isLogin ? 'USER SIGNUP' : 'USER LOGIN'}
			</h1>

			<Input
				icon={<MdAlternateEmail />}
				iconClass='top-2.5 left-2.5'
				className='mb-5 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
				style={{ width: '30rem' }}
				type='email'
				placeholder='email'
			/>

			{isLogin && (
				<Input
					icon={<RiUserLine />}
					iconClass='top-2.5 left-2.5'
					className='mb-5 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
					style={{ width: '30rem' }}
					type='text'
					placeholder='name'
				/>
			)}

			<Input
				icon={<RiLockPasswordLine />}
				iconClass='top-2.5 left-2.5'
				className='mb-5 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
				style={{ width: '30rem' }}
				type='password'
				placeholder='password'
			/>

			<Button
				className='text-slate-500 mb-5 hover:text-slate-400'
				onClick={switchAuthModeHandler}
				type='button'
			>
				{isLogin
					? 'Already have an account?'
					: "Don't have an account?"}
			</Button>

			<Link
				to='/all-boards'
				className='rounded-3xl px-6 py-2 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-black text-center font-bold'
			>
				{isLogin ? 'SIGNUP' : 'LOGIN'}
			</Link>
		</div>
	);
};

export default AuthForm;
