import Button from '../../../shared/components/UI/Button';

import { AiOutlineClose } from 'react-icons/ai';

const BoardTableItem = (props) => {
    const {task} = props;

	return (
		<div className='rounded-lg bg-white mx-3 mt-5 py-2 shadow-lg'>
			{task.taskPriority === 'Low' && (
				<p className='bg-blue-500 text-white rounded-md text-center ml-2 w-1/2'>
					Low Priority
				</p>
			)}

			{task.taskPriority === 'Med' && (
				<p className='bg-green-500 text-white rounded-md text-center ml-2 w-1/2'>
					Med Priority
				</p>
			)}

			{task.taskPriority === 'High' && (
				<p className='bg-red-500 text-white rounded-md text-center ml-2 w-1/2'>
					High Priority
				</p>
			)}

			<p className='ml-2 mt-2'>{task.taskName}</p>
			<div className='flex justify-between items-center mt-2'>
				<img
					className='mx-2 self-end h-8 w-8'
					style={{ borderRadius: '50%' }}
					src={task.img}
					alt='person'
				/>

				<Button className='border rounded-full h-8 w-8 flex justify-center items-center mx-2'>
					<AiOutlineClose />
				</Button>
			</div>
		</div>
	);
};

export default BoardTableItem;
