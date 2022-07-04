import Input from '../../shared/components/UI/Input/Input';
import Button from '../../shared/components/UI/Button';

import { RiUserLine, RiLockPasswordLine } from 'react-icons/ri';
import { MdAlternateEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(false);
	const navigate = useNavigate();

	const switchAuthModeHandler = () => {
		setIsLogin(!isLogin);
	};

	const authHandler = (e) => {
		e.preventDefault();
		navigate('/all-boards', {replace: true})
	}

	return (
		<div className='flex flex-col justify-center items-center my-20 py-5 border-y'>
			<h1 className='text-2xl font-bold mb-5 text-blue-600'>
				{isLogin ? 'USER SIGNUP' : 'USER LOGIN'}
			</h1>

			<form onSubmit={authHandler}>
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

				<div className='flex flex-col justify-center items-center'>
					<Button
						className='text-slate-500 mb-5 hover:text-slate-400'
						onClick={switchAuthModeHandler}
						type='button'
					>
						{isLogin
							? 'Already have an account?'
							: "Don't have an account?"}
					</Button>

					<Button
						type='submit'
						className='rounded-3xl px-6 py-2 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-300 hover:to-blue-400 text-black text-center font-bold'
					>
						{isLogin ? 'SIGNUP' : 'LOGIN'}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AuthForm;
