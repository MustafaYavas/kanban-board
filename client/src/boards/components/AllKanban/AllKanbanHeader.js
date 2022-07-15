import { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { boardActions } from '../../../shared/store/kanban-slice';

const OPTIONS = [
    'Create Date - Desc', 'Create Date - Asc', 'Alphabetical', 'Most Members'
]

const AllKanbanHeader = (props) => {
    const { length } = props;
    const [filter, setFilter] = useState(OPTIONS[0]);
    const dispatch = useDispatch();

    const selectFilterHandler = (e) => {
        setFilter(e.target.value);
    }
    useEffect(() => {
        if(filter === OPTIONS[0]) dispatch(boardActions.sortByDateDesc())
        else if(filter === OPTIONS[1]) dispatch(boardActions.sortByDateAsc())
        else if(filter === OPTIONS[2]) dispatch(boardActions.sortByAlphabetical())
        else dispatch(boardActions.sortByMemberNumber())
    },[filter, dispatch])

	return (
        <div className='flex justify-between items-center'>
            <p className='font-bold text-lg'>
                Showing {length} Kanban {length > 1 ? 'Projects' : 'Project'}
            </p>

            <select 
                onChange={selectFilterHandler} 
                className='border border-slate-300 rounded-md font-medium text-sky-600 px-5 text-lg'
            >
                {
                    OPTIONS.map((key, i) => (
                        <option key={i} value={key}>{key}</option>
                    ))
                }
            </select>
        </div>
    )
};

export default AllKanbanHeader;