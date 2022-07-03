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
		<div className='flex flex-col justify-center items-center mt-20 text-white'>
			<h1 className='text-blue-600 font-bold text-lg mb-4'>
				Create New Kanban Board
			</h1>

			<form className='p-5 bg-slate-800 rounded-lg'>
				<Input
					icon={<MdOutlineDriveFileRenameOutline />}
					label='Kanban Title'
					iconClass='top-2.5 left-2.5 mt-2'
					className='bg-gray-900 mb-5 mt-2 border-2 rounded-3xl p-1 pr-4 pl-10 focus:border-blue-600'
					style={{ width: '20rem' }}
					type='text'
					placeholder='Title'
				/>

				<Input
					icon={<TiGroup />}
					label='Number of Participants'
					iconClass='top-2.5 left-2.5 mt-2'
					className='bg-gray-900 mb-5 mt-2 border-2 rounded-3xl p-1 pr-4 pl-10 focus:border-blue-600'
					style={{ width: '20rem' }}
					type='number'
					min='1'
					max='20'
					placeholder='Number of Participants'
				/>

				<Input
					icon={<BsQuestion />}
					label='Usage Area'
					iconClass='top-2.5 left-2.5 mt-2'
					className='bg-gray-900 mb-5 mt-2 border-2 rounded-3xl p-1 pr-4 pl-10 focus:border-blue-600'
					style={{ width: '20rem' }}
					type='text'
					placeholder='What will you use it for? eg: Personal'
				/>

				<div className='flex justify-center'>
					<Button
						type='submit'
						className='border border-blue-600 p-2 rounded-3xl hover:bg-blue-600 w-1/2'
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
