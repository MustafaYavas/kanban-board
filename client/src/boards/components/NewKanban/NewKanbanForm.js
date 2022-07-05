import Input from '../../../shared/components/UI/Input/Input';
import Button from '../../../shared/components/UI/Button';
import { useEffect, useState } from 'react';

import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { TiGroup } from 'react-icons/ti';
import { BsQuestion } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';

const NewKanbanForm = () => {
	const navigate = useNavigate();
	const [title, setTitle] = useState('');
	const [participantsNumber, setParticipantsNumber] = useState('');
	const [usageArea, setUsageArea] = useState('');
	const [isDisabled, setIsDisabled] = useState(true);

	const createKanbanHandler = (e) => {
		e.preventDefault();
		navigate('/boards/1', {replace: true})
	};

	useEffect(() => {
		if(title.length < 5 || participantsNumber.length === 0 || usageArea.length < 5) {
			setIsDisabled(true);
		} else {
			setIsDisabled(false);
		}
	}, [title, participantsNumber, usageArea, isDisabled])

	return (
		<div className='flex flex-col justify-center items-center my-20 py-5 border-y'>
			<h1 className='text-2xl font-bold mb-5 text-blue-600'>
				CREATE NEW KANBAN BOARD
			</h1>

			<form onSubmit={createKanbanHandler}>
				<Input
					icon={<MdOutlineDriveFileRenameOutline />}
					iconClass='top-2.5 left-2.5'
					className='mb-5 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
					onChange={(e) => {setTitle(e.target.value)}}
					value={title}
					style={{ width: '30rem' }}
					type='text'
					placeholder='Title'
				/>

				<Input
					icon={<TiGroup />}
					iconClass='top-2.5 left-2.5'
					className='mb-5 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
					onChange={(e) => {setParticipantsNumber(e.target.value)}}
					value={participantsNumber}
					style={{ width: '30rem' }}
					type='number'
					min='1'
					max='20'
					placeholder='Number of Participants'
				/>

				<Input
					icon={<BsQuestion />}
					iconClass='top-2.5 left-2.5'
					className='mb-5 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
					onChange={(e) => {setUsageArea(e.target.value)}}
					value={usageArea}
					style={{ width: '30rem' }}
					type='text'
					placeholder='What will you use it for? eg: Personal'
				/>

				<div className='flex justify-center'>
					<Button
						type='submit'
						className={`rounded-3xl px-6 py-2 text-black text-center font-bold ${isDisabled ? 'bg-slate-300' : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-300 hover:to-blue-400'}`}
						disabled={isDisabled}
					>
						CREATE
					</Button>
				</div>
			</form>
		</div>
	);
};

export default NewKanbanForm;
