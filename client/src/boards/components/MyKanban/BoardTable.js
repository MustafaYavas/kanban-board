import BoardTableItem from './BoardTableItem';
import AddTask from './Utils/AddTask';

import { useSelector } from 'react-redux';

const TABLES = [
    'Backlog', 'In Progress', 'Review', 'Complete'
]

const BoardTable = (props) => {
	const board = useSelector(state => state.board).board;
	return (
		<>
			{
				TABLES.map(t => (
					<div className='bg-slate-100 py-5 mb-5 rounded-lg shadow-lg'>
						<h1 className='font-semibold text-lg mx-3'>{t}</h1>
							{
								board.tasks.length > 0 && board.tasks.map(task => (
									t===task.taskTable && <BoardTableItem 
										task={task}
									/>
								))
							}
						<AddTask tables={TABLES}/>
					</div>
				))
			}
		</>
	);
};

export default BoardTable;
