import { useState } from 'react';
import Select from '../../../shared/components/UI/Select';

const DUMMY_OPTIONS = [
    'Create Date', 'Alphabetical', 'Most Members'
]

const AllKanbanHeader = (props) => {
    const { length } = props;
    const [filter, setFilter] = useState('Create Date');

    const selectFilterHandler = (e) => {
        setFilter(e.target.value);
    }

	return (
        <div className='flex justify-between items-center'>
            <p className='font-bold text-lg'>
                Showing {length} Kanban Projects
            </p>
            <Select
                name='filter'
                className='border border-slate-300 rounded-lg font-medium text-sky-600 px-5 text-lg'
                options={DUMMY_OPTIONS}
                onChange={selectFilterHandler}
                value={filter}
            />
        </div>
    )
};

export default AllKanbanHeader;