import AllKanbanHeader from '../components/AllKanban/AllKanbanHeader';
import AllkanbanItem from '../components/AllKanban/AllKanbanItem';
import AllKanbanSearch from '../components/AllKanban/AllKanbanSearch';
import LoadingSpinner from '../../shared/components/UI/Spinner/LoadingSpinner';
import ErrorLayout from '../../shared/components/UI/ErrorLayout';

import { useEffect, useState } from 'react';

const AllKanbanList = () => {
    const [allBoards, setAllBoards] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {
        const fetchDatas = async() => {
            setIsLoading(true);
            try {
                const response = await fetch('http://localhost:5000/api/boards/all-boards');
                const responseData = await response.json();
                if(!response.ok) {
                    throw new Error(responseData.message);
                } 
                setAllBoards(responseData);
            } catch (error) {
                setError('Something went wrong while fetching board datas. Please try again later!');
            }
            setIsLoading(false);
        }
        fetchDatas();
    }, [])
    
    return (
        <>
            <ErrorLayout error={error}/>
            <div> 
                {isLoading && <LoadingSpinner asOverlay />}
                <AllKanbanSearch />
                <AllKanbanHeader length={allBoards.length} />
                {
                    allBoards.map(board => (
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
        </>
    )
}

export default AllKanbanList;