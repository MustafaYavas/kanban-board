// api'den istek atarak tüm kanbanları çek
import AllKanbanHeader from '../components/AllKanban/AllKanbanHeader';
import AllkanbanItem from '../components/AllKanban/AllKanbanItem';
import AllKanbanSearch from '../components/AllKanban/AllKanbanSearch';

const DUMMY_DATAS = [
    {
        id: 1,
        title: 'Kanban Deneme 1',
        usageArea: 'Software',
        owner: 'Mustafa',
        numberOfMembers: 8,
        createDate: '02/07/2022'
    },

    {
        id: 2,
        title: 'Kanban Deneme 2',
        usageArea: 'Wearable Technology',
        owner: 'Murat',
        numberOfMembers: 12,
        createDate: '01/07/2022'
    }
]

const AllKanbanList = () => {
    return (
        <div> 
            <AllKanbanSearch />
            <AllKanbanHeader length={DUMMY_DATAS.length} />
            {
                DUMMY_DATAS.map(data => (
                    <AllkanbanItem 
                        key={data.id}
                        title={data.title}
                        usageArea={data.usageArea}
                        owner={data.owner}
                        numberOfMembers={data.numberOfMembers}
                        createDate={data.createDate}
                    />
                ))
            }
        </div>
    )
}

export default AllKanbanList;