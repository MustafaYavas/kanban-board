import BoardTableItem from './BoardTableItem';
import AddTask from './Utils/AddTask';

const DUMMY_OPTIONS = [
    'Low', 'Med', 'High'
]

const BoardTable = (props) => {
	const { tableTitle, tables } = props;

	return (
		<div className='bg-slate-100 py-5 mb-5 rounded-lg shadow-lg'>
			<h1 className='font-semibold text-lg mx-3'>{tableTitle}</h1>

			<BoardTableItem />
			<AddTask tables={tables} options={DUMMY_OPTIONS}/>
		</div>
	);
};

export default BoardTable;
