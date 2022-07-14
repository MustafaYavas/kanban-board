import BoardTable from '../components/MyKanban/BoardTable';
import UpdateBoard from '../components/MyKanban/Utils/UpdateBoard';
import LoadingSpinner from '../../shared/components/UI/Spinner/LoadingSpinner';
import ErrorLayout from '../../shared/components/UI/ErrorLayout';
import SelectBoard from '../components/MyKanban/Utils/SelectBoard';
import { boardActions } from '../../shared/store/kanban-slice';
import AddTask from '../components/MyKanban/Utils/AddTask';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const TABLES = [
    'Backlog', 'In Progress', 'Review', 'Complete'
]

const MyKanbanBoard = () => {
    const board = useSelector(state => state.board).board;
    const user = useSelector(state => state.user).user;
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const params = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchData = async() => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/boards/${params.bid}`);
                const responseData = await response.json();
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
                dispatch(boardActions.setCurrentBoard(responseData.board));
            } catch (error) {
                setError('Someting went wrong while fetchig board datas. Please try again later!');
            }
            setIsLoading(false);
        }
        fetchData();
    }, [params.bid, dispatch]);

    return (
        <>
            <ErrorLayout error={error} />
            {isLoading && <LoadingSpinner asOverlay />}
            {
                board &&
                <div className='mt-5'>
                    <div className='flex justify-between items-center'>
                        { board.owner === user.id && <UpdateBoard /> }
                        <h1 className='text-center font-semibold text-lg text-blue-600'>{board.title}</h1>
                        { board.owner === user.id && <SelectBoard /> }
                    </div>
                    <div className='flex justify-center'>
                        {board.owner === user.id && <AddTask tables={TABLES}/>}
                    </div>
                    <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-5'>
                        <BoardTable tables={TABLES}/>
                    </div>
                </div>
            }
        </>
    )
}

export default MyKanbanBoard;