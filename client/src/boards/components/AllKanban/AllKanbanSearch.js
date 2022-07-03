import Input from '../../../shared/components/UI/Input/Input';

import { FcSearch } from 'react-icons/fc';


const AllKanbanSearch = () => {
    return (
        <div className='my-10 pl-5 rounded-lg bg-slate-200 font-semibold text-lg'>
            <Input 
                icon={<FcSearch />}
                iconClass='h-16 flex justify-center items-center'
                className='p-1 pr-4 pl-8 bg-slate-200 h-16'
                style={{width: '80%'}}
                type='text'
                placeholder='Search Kanban'
            />
        </div>
    )
}

export default AllKanbanSearch;