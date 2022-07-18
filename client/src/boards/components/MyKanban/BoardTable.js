import BoardTableItem from './BoardTableItem';

import { useSelector } from 'react-redux';

const TABLE_COLORS = [
    'linear-gradient(to right, #A500FE, #FE0096, #FE003A) 30', 
	'linear-gradient(to right, #FEC100, #FEDF00, #FAFE00) 30', 
	'linear-gradient(to right, #0000CD, #7B68EE, #87CEFA) 30', 
	'linear-gradient(to right, #08FE00, #64FE00, #B1FE00) 30'
]

const BoardTable = (props) => {
	const { tables }= props;
	const board = useSelector(state => state.board).board;
	
	return (
		<>
			{
				tables.map((t, i) => (
					<div 
						key={i} 
						className='bg-slate-100 py-5 mt-5 mb-5 rounded-b-lg shadow-lg border-t-2' 
						style={{borderImage: TABLE_COLORS[i]}}
					>
						<h1 className='font-semibold text-lg mx-3'>{t}</h1>
							{
								board.tasks.map(task => (
									t===task.taskTable && 
									<BoardTableItem key={task.id} id={task.id} task={task} tables={tables} />
								))
							}
						
					</div>
				))
			}
		</>
	);
};

export default BoardTable;