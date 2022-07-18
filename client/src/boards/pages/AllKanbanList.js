import AllKanbanHeader from '../components/AllKanban/AllKanbanHeader';
import AllkanbanItem from '../components/AllKanban/AllKanbanItem';
import AllKanbanSearch from '../components/AllKanban/AllKanbanSearch';
import LoadingSpinner from '../../shared/components/UI/Spinner/LoadingSpinner';
import ErrorLayout from '../../shared/components/UI/ErrorLayout';
import { boardActions } from '../../shared/store/kanban-slice';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const AllKanbanList = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const board = useSelector(state => state.board);
    const user = useSelector(state => state.user).user;
    const dispatch = useDispatch();
    
    useEffect(() => {
        const fetchDatas = async() => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/boards/all-boards');
                const responseData = await response.json();
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
                dispatch(boardActions.setAllBoards(responseData));
                dispatch(boardActions.sortByDateDesc())
            } catch (error) {
                setError('Something went wrong while fetching board datas. Please try again later!');
            }
            setIsLoading(false);
        }
        fetchDatas();
    }, [dispatch]);

    useEffect(() => {
        let userBoardDatas = [];
        const fetchBoards = async() => {
            for(let i=0; i<user.memberBoards.length; i++) {
                try {
                    const response = await fetch(`http://localhost:5000/api/boards/${user.memberBoards[i]}`);
                    const responseData = await response.json();
                    if(!response.ok) {
                        throw new Error(responseData.message);
                    }
                    userBoardDatas.push(responseData.board.id);
                } catch (error) {}
            }
            
            try {
                const response = await fetch(`http://localhost:5000/api/users/${user.username}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({username: user.username, newBoards: userBoardDatas})
            })
                const responseData = await response.json();
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
            } catch (error) {
                
            }
        }
        fetchBoards();
    }, [user])
    
    return (
        <div className='margin'>
            <ErrorLayout error={error}/>
            <div className='pb-5'> 
                {isLoading && <LoadingSpinner asOverlay />}
                <AllKanbanSearch />
                {(board.allBoards && board.searchKey === '') && <AllKanbanHeader length={board.allBoards.length} />}
                {board.searchKey !== '' && <AllKanbanHeader length={board.searchedBoards.length} />}
                {
                    (board.allBoards && board.searchKey === '') && board.allBoards.map(board => (
                        <AllkanbanItem 
                            key={board.id}
                            id={board.id}
                            title={board.title}
                            usageArea={board.usageArea}
                            creatorName={board.creatorName}
                            membersNumber={board.membersNumber}
                            membersLength={board.members.length}
                            createDate={board.createDate}
                            boardPassword={board.boardPassword}
                        />
                    ))
                }
                {
                    (board.searchKey.length > 0 && board.searchedBoards.length === 0) && 
                    <p className='text-center mt-20 text-blue-600 font-bold text-3xl'>Board Not Found!</p>
                }

                {
                    board.allBoards && board.searchedBoards.map(board => (
                        <AllkanbanItem 
                            key={board.id}
                            id={board.id}
                            title={board.title}
                            usageArea={board.usageArea}
                            creatorName={board.creatorName}
                            membersNumber={board.membersNumber}
                            membersLength={board.members.length}
                            createDate={board.createDate}
                            boardPassword={board.boardPassword}
                        />
                    ))
                }
                
            </div>
        </div>
    )
}

export default AllKanbanList;