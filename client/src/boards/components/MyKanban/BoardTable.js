import BoardTableItem from './BoardTableItem';

import { useSelector } from 'react-redux';

const BoardTable = (props) => {
	const { tables }= props;
	const board = useSelector(state => state.board).board;
	
	return (
		<>
			{
				tables.map((t, i) => (
					<div key={i} className='bg-slate-100 py-5 mb-5 rounded-lg shadow-lg'>
						<h1 className='font-semibold text-lg mx-3'>{t}</h1>
							{
								board.tasks.map((task, i) => (
									t===task.taskTable && <BoardTableItem key={i} task={task} tables={tables} />
								))
							}
						
					</div>
				))
			}
		</>
	);
};

export default BoardTable;
