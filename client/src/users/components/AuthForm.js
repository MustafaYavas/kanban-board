import Input from '../../shared/components/UI/Input/Input';
import Button from '../../shared/components/UI/Button';
import { userActions } from '../../shared/store/user-slice';
import LoadingSpinner from '../../shared/components/UI/Spinner/LoadingSpinner';
import ErrorLayout from '../../shared//components/UI/ErrorLayout';

import { RiUserLine, RiLockPasswordLine } from 'react-icons/ri';
import { MdAlternateEmail } from 'react-icons/md';
import { FaUserNinja } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState(true);
	const [email, setEmail] = useState('');
	const [name, setName] = useState('');
	const [password, setpassword] = useState('');
	const [username, setUsername] = useState('');
	const [isTouched, setIsTouched] = useState(false);
	const [formError, setFormError] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
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

	const fetchBoards = async(user) => {
        let userBoardDatas = []
        for(let i=0; i<user.memberBoards.length; i++) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/${user.memberBoards[i]}`);
                const responseData = await response.json();
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
                userBoardDatas.push(responseData.board.id);
            } catch (error) {}
        }
        dispatch(userActions.setUserBoards(userBoardDatas))
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${user.username}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: user.username, newBoards: userBoardDatas})
        })
            const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData.message);
            }
        } catch (error) {}
    }

	const authHandler = async(e) => {
		e.preventDefault();
		setIsLoading(true);
		setError();
		if(isLogin) {
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({email, password})
                })
                const responseData = await response.json();
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
				const tokenExpDate = new Date(new Date().getTime() + 1000 * 60 * 60 * 24);
                dispatch(userActions.authHandler({ user: responseData.user, token: responseData.token, tokenExpDate:tokenExpDate }));
				localStorage.setItem('userData', JSON.stringify(
					{
						user: responseData.user, 
						token: responseData.token,
						expiration: tokenExpDate.toISOString()
					}
				));
				fetchBoards(responseData.user)
                navigate('/all-boards', {replace: true});
            } catch (error) {
                setError('Something went wrong while logging you in. Please try again later!');
            }
        } else {
			try {
				const randomImgUrl = Math.floor((Math.random() * 200) + 1);
				const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/users/signup`, {
					method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
						email, name, username, password, image:`https://picsum.photos/id/${randomImgUrl}/200`}
					)
				})
				const responseData = await response.json();
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
				const tokenExpDate = new Date(new Date().getTime() + 1000 * 60 * 60 *24);
				dispatch(userActions.authHandler({ user: responseData.user, token: responseData.token, tokenExpDate:tokenExpDate }));
				localStorage.setItem('userData', JSON.stringify(
					{ 
						user: responseData.user, 
						token: responseData.token,
						expiration: tokenExpDate
					}
				));
				navigate('/all-boards', {replace: true});
			} catch (error) {
				setError('Something went wrong while signing you up. Please try again later!');
			}
		}
		setIsLoading(false);
	}

	useEffect(() => {
		if(isLogin) 
			(!email.includes('@') || password.length < 5) ? setFormError(true) : setFormError(false);
		else 
			(!email.includes('@') || name.length === 0 || password.length < 5 || username.length < 5) ? setFormError(true) : setFormError(false);
	}, [isLogin, email, name, password, username, formError]);

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

	const changeUsernameHandler = (e) => {
		setUsername(e.target.value);
		setIsTouched(true);
	}

	return (
		<>	
			<ErrorLayout error={error} />
			<div className='flex flex-col justify-center items-center my-20 py-5 border-y'>
				<h1 className='text-2xl font-bold mb-4 text-blue-600'>
					{isLogin ? 'USER LOGIN' : 'USER SIGNUP'}
				</h1>
				{isLoading && <LoadingSpinner asOverlay/>}
				<form onSubmit={authHandler}>
					<div className='flex flex-col justify-center items-center'>
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

						{!isLogin && (
							<Input
								icon={<FaUserNinja />}
								iconClass='top-2.5 left-2.5'
								className='mb-1 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
								onChange={changeUsernameHandler}
								value={username}
								style={{ width: '30rem' }}
								type='text'
								placeholder='username'
								error={isTouched && username.length < 5}
								errorText='Can not be less than 5 characters!'
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
					</div>


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
							className={`rounded-lg px-6 py-2 text-black text-center font-bold ${formError ? 'bg-slate-300' : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-300 hover:to-blue-400'}`}
							disabled={formError}
						>
							{isLogin ? 'LOGIN' : 'SIGNUP'}
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};

export default AuthForm;