import Input from '../../../shared/components/UI/Input/Input';
import Button from '../../../shared/components/UI/Button';
import LoadingSpinner from '../../../shared/components/UI/Spinner/LoadingSpinner';
import ErrorLayout from '../../../shared/components/UI/ErrorLayout';
import { userActions } from '../../../shared/store/user-slice';

import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { TiGroup } from 'react-icons/ti';
import { BsQuestion } from 'react-icons/bs';
import { RiLockPasswordLine } from 'react-icons/ri'
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const NewKanbanForm = () => {
	const navigate = useNavigate();
	const user = useSelector(state => state.user);
	const [title, setTitle] = useState('');
	const [membersNumber, setMembersNumber] = useState('');
	const [usageArea, setUsageArea] = useState('');
	const [boardPassword, setBoardPassword] = useState('');
	const [formError, setFormError] = useState(true);
	const [isTouched, setIsTouched] = useState(false);
	const [error, setError] = useState();
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	
	const createKanbanHandler = async(e) => {
		e.preventDefault();
		setIsLoading(true);
		setError();
		try {
			const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards`, {
				method:'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: 'Bearer ' + user.token
				},
				body: JSON.stringify({
					title, usageArea, membersNumber, owner: user.user.id, creatorName: user.user.username, boardPassword
				})
			})

			const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData.message);
            }
			dispatch(userActions.addBoardToUser(responseData.board.id));
			navigate(`/all-boards`, {replace: true})
		} catch (error) {
			setError('Something went wrong while creating new board. Please try againg later!');
		}
		setIsLoading(false)
	};

	useEffect(() => {
		if(title.length === 0 || membersNumber.length === 0 || usageArea.length < 5 || boardPassword.length < 5)       			setFormError(true);
		else setFormError(false);
	}, [title, membersNumber, usageArea, boardPassword, formError]);

	const changeTitleHandler = (e) => {
		setTitle(e.target.value);
		setIsTouched(true);
	}

	const changeMembersHandler = (e) => {
		setMembersNumber(e.target.value);
		setIsTouched(true);
	}
	
	const changeUsageHandler = (e) => {
		setUsageArea(e.target.value);
		setIsTouched(true);
	}

	const changePasswordHandler = (e) => {
		setBoardPassword(e.target.value);
		setIsTouched(true);
	}

	return (
		<>
			<ErrorLayout error={error} />
			<div className='flex flex-col justify-center items-center my-20 py-5 border-y'>
				<h1 className='text-2xl font-bold mb-4 text-blue-600'>
					CREATE NEW KANBAN BOARD
				</h1>
				{isLoading && <LoadingSpinner asOverlay/>}
				<form onSubmit={createKanbanHandler}>
					<Input
						icon={<MdOutlineDriveFileRenameOutline />}
						iconClass='top-2.5 left-2.5'
						className='mb-1 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
						onChange={changeTitleHandler}
						value={title}
						style={{ width: '30rem' }}
						type='text'
						placeholder='Title'
						error={isTouched && title.length === 0}
						errorText='Can not be empty!'
					/>

					<Input
						icon={<TiGroup />}
						iconClass='top-2.5 left-2.5'
						className='mb-1 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
						onChange={changeMembersHandler}
						value={membersNumber}
						style={{ width: '30rem' }}
						type='number'
						min='0'
						max='20'
						placeholder='Number of Members'
						error={isTouched && membersNumber.length === 0}
						errorText='Can not be empty!'
					/>

					<Input
						icon={<BsQuestion />}
						iconClass='top-2.5 left-2.5'
						className='mb-1 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
						onChange={changeUsageHandler}
						value={usageArea}
						style={{ width: '30rem' }}
						type='text'
						placeholder='What will you use it for? eg: Personal'
						error={isTouched && usageArea.length < 5}
						errorText='Can not be less than 5 characters!'
					/>

					<Input
						icon={<RiLockPasswordLine />}
						iconClass='top-2.5 left-2.5'
						className='mb-1 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
						onChange={changePasswordHandler}
						value={boardPassword}
						style={{ width: '30rem' }}
						type='password'
						placeholder='Password'
						error={isTouched && boardPassword.length < 5}
						errorText='Can not be less than 5 characters!'
					/>

					<div className='flex justify-center'>
						<Button
							type='submit'
							className={`rounded-lg px-6 py-2 text-black text-center font-bold ${formError ? 'bg-slate-300' : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-300 hover:to-blue-400'}`}
							disabled={formError}
						>
							CREATE
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};

export default NewKanbanForm;