import Select from '../../../shared/components/UI/Select';

const DUMMY_OPTIONS = [
    {
        value: 'createDate',
        text: 'Create Date'
    },

    {
        value: 'alphabetical',
        text: 'Alphabetical'
    },

    {
        value: 'mostMembers',
        text: 'Most Members'
    },
]

const AllKanbanHeader = (props) => {
    const { length } = props;

	return (
        <div className='flex justify-between items-center'>
            <p className='font-bold text-lg'>
                Showing {length} Kanban Projects
            </p>
            <Select
                name='filter'
                className='border border-slate-300 rounded-lg font-medium text-sky-600 px-5 text-lg'
                options={DUMMY_OPTIONS}
            />
        </div>
    )
};

export default AllKanbanHeader;