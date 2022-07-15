import Input from '../../../shared/components/UI/Input/Input';
import { boardActions } from '../../../shared/store/kanban-slice';

import { FcSearch } from 'react-icons/fc';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const AllKanbanSearch = () => {
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();

    const changeSearchTextHandler = (e) => {
        setSearchText(e.target.value);
        dispatch(boardActions.searchBoards(e.target.value));
    }

    useEffect(() => {
        dispatch(boardActions.searchBoards(''));
    }, [dispatch])

    return (
        <div className='my-10 pl-5 rounded-lg bg-slate-200 font-semibold text-lg'>
            <Input 
                icon={<FcSearch />}
                iconClass='h-16 flex justify-center items-center'
                className='p-1 pr-4 pl-8 bg-slate-200 h-16'
                style={{width: '80%'}}
                type='text'
                placeholder='Search Kanban'
                onChange={changeSearchTextHandler}
                value={searchText}
            />
        </div>
    )
}

export default AllKanbanSearch;