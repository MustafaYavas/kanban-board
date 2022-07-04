import BoardTableItem from './BoardTableItem';

import { AiOutlinePlus } from 'react-icons/ai';

const BoardTable = (props) => {
	const { tableTitle } = props;

	return (
		<div className='bg-slate-100 py-5 mb-5 rounded-lg shadow-lg'>
			<h1 className='font-semibold text-lg mx-3'>{tableTitle}</h1>

			<BoardTableItem />

			<div className='flex justify-center items-center bg-white mt-5 mx-3 rounded-lg' role='button'>
                <p className='m-2'>Add New Task</p>
                <AiOutlinePlus/>
            </div>
		</div>
	);
};

export default BoardTable;
