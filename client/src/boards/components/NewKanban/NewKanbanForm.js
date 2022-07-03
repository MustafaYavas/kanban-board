import Input from '../../../shared/components/UI/Input/Input';

import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { TiGroup } from 'react-icons/ti';
import { BsQuestion } from 'react-icons/bs';
import Button from '../../../shared/components/UI/Button';

const NewKanbanForm = () => {
	const createKanbanHandler = (e) => {
		e.preventDefault();
	};

	return (
		<div className='flex flex-col justify-center items-center  my-20 py-5 border-y'>
			<h1 className='text-2xl font-bold mb-5 text-blue-600'>
				Create New Kanban Board
			</h1>

			<form className='rounded-lg'>
				<Input
					icon={<MdOutlineDriveFileRenameOutline />}
					iconClass='top-2.5 left-2.5'
					className=' mb-5 border border-slate-700 rounded-3xl p-1 pr-4 pl-10 focus:border-blue-600'
					style={{ width: '30rem' }}
					type='text'
					placeholder='Title'
				/>

				<Input
					icon={<TiGroup />}
					iconClass='top-2.5 left-2.5'
					className='mb-5 border border-slate-700 rounded-3xl p-1 pr-4 pl-10 focus:border-blue-600'
					style={{ width: '30rem' }}
					type='number'
					min='1'
					max='20'
					placeholder='Number of Participants'
				/>

				<Input
					icon={<BsQuestion />}
					iconClass='top-2.5 left-2.5'
					className='mb-5 border border-slate-700 rounded-3xl p-1 pr-4 pl-10 focus:border-blue-600'
					style={{ width: '30rem' }}
					type='text'
					placeholder='What will you use it for? eg: Personal'
				/>

				<div className='flex justify-center'>
					<Button
						type='submit'
						className='rounded-3xl px-6 py-2 text-white bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-black text-center font-bold'
						onClick={createKanbanHandler}
					>
						CREATE
					</Button>
				</div>
			</form>
		</div>
	);
};

export default NewKanbanForm;
