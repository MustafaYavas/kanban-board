import BoardTable from '../components/MyKanban/BoardTable';
import UpdateBoard from '../components/MyKanban/Utils/UpdateBoard';
// import ShowMembers from '../components/MyKanban/Utils/ShowMembers';
import LoadingSpinner from '../../shared/components/UI/Spinner/LoadingSpinner';
import ErrorLayout from '../../shared/components/UI/ErrorLayout';
import SelectBoard from '../components/MyKanban/Utils/SelectBoard';
import { boardActions } from '../../shared/store/kanban-slice';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const MyKanbanBoard = () => {
    const board = useSelector(state => state.board).board;
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
            <div className='mt-5'>
                <div className='flex justify-between'>
                    <UpdateBoard />
                    <h1 className='text-center'>{board.title}</h1>
                    <SelectBoard />
                    {/* <ShowMembers /> */}
                </div>

                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-5'>
                    <BoardTable />
                </div>
            </div>
        </>
    )
}

export default MyKanbanBoard;