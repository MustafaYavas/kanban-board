import BoardTable from '../components/MyKanban/BoardTable';

const DUMMY_TABLES = [
    'Backlog', 'In Progress', 'Review', 'Complete'
]

const MyKanbanBoard = () => {
    return (
        <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-10'>
            {
                DUMMY_TABLES.map((table, i) => (
                    <BoardTable 
                        key={i}
                        tableTitle={table}
                    />
                ))
            }
        </div>
    )
}

export default MyKanbanBoard;