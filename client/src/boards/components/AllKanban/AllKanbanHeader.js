import { boardActions } from '../../../shared/store/kanban-slice';
import Button from '../../../shared/components/UI/Button';

import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const OPTIONS = [
    'Create Date - Desc', 'Create Date - Asc', 'Alphabetical', 'Most Members'
]

const AllKanbanHeader = (props) => {
    const { length } = props;
    const [filter, setFilter] = useState(OPTIONS[0]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const selectFilterHandler = (e) => {
        setFilter(e.target.value);
    }

    const navigatePageHandler = () => {
        navigate('/boards/new')
    }

    useEffect(() => {
        if(filter === OPTIONS[0]) dispatch(boardActions.sortByDateDesc())
        else if(filter === OPTIONS[1]) dispatch(boardActions.sortByDateAsc())
        else if(filter === OPTIONS[2]) dispatch(boardActions.sortByAlphabetical())
        else dispatch(boardActions.sortByMemberNumber())
    },[filter, dispatch])

	return (
        <>
            {
                length === 0 && 
                <div className='flex flex-col justify-center items-center'>
                    <h1 className='text-xl font-medium text-red-600'>No kanban projects found!</h1>
                    <h2 className='text-lg font-normal text-red-500'>Click the button to create</h2>
                    <Button
                        type='button'
                        className='mt-5 border border-red-600 py-2 px-5 rounded-md font-medium hover:bg-red-600 hover:text-white'
                        onClick={navigatePageHandler}
                    >
                        CREATE
                    </Button>
                </div>
            }
            {
                length !== 0 && 
                <div className={`flex justify-between items-center`}>
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
            }
        </>
    )
};

export default AllKanbanHeader;