// tüm kanbanları listele
const AllkanbanItem = (props) => {
    const { title, field, owner, numOfParticipants, createDate } = props;

    return (
        <>
            <div role='button' className='my-5 bg-slate-200 p-10 rounded-lg hover:bg-slate-300'>
                <p className='text-2xl font-semibold'>{title}</p>
                <p className='font-medium'>{field}</p>
                <div className='text-gray-600 flex flex-row font-medium'>
                    <p className='mr-5'>{owner}</p>
                    &bull;
                    <p className='mx-5'>{numOfParticipants}</p>
                    &bull;
                    <p className='ml-5'>{createDate}</p>
                </div>
            </div>
        </>

    )
}

export default AllkanbanItem;