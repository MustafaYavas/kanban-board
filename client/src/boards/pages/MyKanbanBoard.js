import BoardTable from '../components/MyKanban/BoardTable';
import UpdateBoard from '../components/MyKanban/Utils/UpdateBoard';
import ShowMembers from '../components/MyKanban/Utils/ShowMembers';
import LoadingSpinner from '../../shared/components/UI/Spinner/LoadingSpinner';
import ErrorLayout from '../../shared/components/UI/ErrorLayout';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DUMMY_TABLES = [
    'Backlog', 'In Progress', 'Review', 'Complete'
]

const MyKanbanBoard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const params = useParams();
    
    useEffect(() => {
        const fetchData = async() => {
            setIsLoading(true);
            try {
                const response = await fetch(`http://localhost:5000/api/boards/${params.bid}`);
                const responseData = await response.json();
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
                
            } catch (error) {
                setError('Someting went wrong while fetchig board datas. Please try again later!');
            }
            setIsLoading(false)
        }

        fetchData();
    }, [params.bid])

    return (
        <>
            <ErrorLayout error={error} />
            <div className='mt-5'>
                {isLoading && <LoadingSpinner asOverlay />}
                <div className='flex justify-between'>
                    <UpdateBoard />
                    {/* Select board componenti oluştur */}
                    <ShowMembers />
                </div>

                <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-5'>
                    {
                        DUMMY_TABLES.map((table, i) => (
                            <BoardTable 
                                key={i}
                                tableTitle={table}
                                tables={DUMMY_TABLES}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default MyKanbanBoard;