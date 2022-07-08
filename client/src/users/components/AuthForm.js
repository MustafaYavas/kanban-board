import Input from '../../shared/components/UI/Input/Input';
import Button from '../../shared/components/UI/Button';
import { userActions } from '../../shared/store/user-slice';

import { RiUserLine, RiLockPasswordLine } from 'react-icons/ri';
import { MdAlternateEmail } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setpassword] = useState('');
	const [isTouched, setIsTouched] = useState(false);
	const [formError, setFormError] = useState(true);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	

	const switchAuthModeHandler = () => {
		setIsLogin(!isLogin);
		setIsTouched(false);
		setFormError(true);
		setEmail('');
		setName('');
		setpassword('');
	};

	const authHandler = (e) => {
		e.preventDefault();

		if(isLogin) {
			// veritabanında kullanıcıyı ara yoksa uyar. Metot tamamlanmadı
			dispatch(userActions.loginHandler(email))
		} else {
			// kullanıcıyı veritabanına kaydet. Metot tamamlanmadı
			dispatch(userActions.signupHandler({email, name, password}))
		}

		navigate('/all-boards', {replace: true});	// hata varsa yönlendirme yapma
	}

	useEffect(() => {
		if(isLogin) 
			(!email.includes('@') || password.length < 5) ? setFormError(true) : setFormError(false);
		else 
			(!email.includes('@') || name.length === 0 || password.length < 5) ? setFormError(true) : setFormError(false);
	}, [isLogin, email, name, password, formError]);

	const changeEmailHandler = (e) => {
		setEmail(e.target.value);
		setIsTouched(true);
	}

	const changeNameHandler = (e) => {
		setName(e.target.value);
		setIsTouched(true);
	}

	const changePasswordHandler = (e) => {
		setpassword(e.target.value);
		setIsTouched(true);
	}

	return (
		<div className='flex flex-col justify-center items-center my-20 py-5 border-y'>
			<h1 className='text-2xl font-bold mb-4 text-blue-600'>
				{isLogin ? 'USER LOGIN' : 'USER SIGNUP'}
			</h1>

			<form onSubmit={authHandler}>
				<Input
					icon={<MdAlternateEmail />}
					iconClass='top-2.5 left-2.5'
					className='mb-1 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
					onChange={changeEmailHandler}
					value={email}
					style={{ width: '30rem' }}
					type='email'
					placeholder='email'
					error={isTouched && !email.includes('@')}
					errorText='Must contain @ character!'
				/>

				{!isLogin && (
					<Input
						icon={<RiUserLine />}
						iconClass='top-2.5 left-2.5'
						className='mb-1 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
						onChange={changeNameHandler}
						value={name}
						style={{ width: '30rem' }}
						type='text'
						placeholder='name'
						error={isTouched && name.length === 0}
						errorText='Can not be empty!'
					/>
				)}

				<Input
					icon={<RiLockPasswordLine />}
					iconClass='top-2.5 left-2.5'
					className='mb-1 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
					onChange={changePasswordHandler}
					value={password}
					style={{ width: '30rem' }}
					type='password'
					placeholder='password'
					error={isTouched && password.length < 5}
					errorText='Can not be less than 5 characters!'
				/>

				<div className='flex flex-col justify-center items-center'>
					<Button
						className='text-slate-500 mb-4 hover:text-slate-400'
						onClick={switchAuthModeHandler}
						type='button'
					>
						{isLogin
							? "Don't have an account ?"
							: 'Already have an account ?'}
					</Button>

					<Button
						type='submit'
						className={`rounded-3xl px-6 py-2 text-black text-center font-bold ${formError ? 'bg-slate-300' : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-300 hover:to-blue-400'}`}
						disabled={formError}
					>
						{isLogin ? 'LOGIN' : 'SIGNUP'}
					</Button>
				</div>
			</form>
		</div>
	);
};

export default AuthForm;
