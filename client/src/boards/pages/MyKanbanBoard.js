import BoardTable from '../components/MyKanban/BoardTable';
import UpdateBoard from '../components/MyKanban/Utils/UpdateBoard';
import ShowMembers from '../components/MyKanban/Utils/ShowMembers';

const DUMMY_TABLES = [
    'Backlog', 'In Progress', 'Review', 'Complete'
]

const MyKanbanBoard = () => {
    
    return (
        <div className='mt-5'>
            <div className='flex justify-between'>
               <UpdateBoard />
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
    )
}

export default MyKanbanBoard;