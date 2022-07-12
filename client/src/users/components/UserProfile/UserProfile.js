import UserInfos from './UserInfos';
import UserProjects from './UserProjects';

const UserProfile = (props) => {
    const { datas } = props;
    
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-3 mt-10 pt-5 border-t'>
            
                <div className='flex flex-col justify-center items-center'>
                    <UserInfos 
                        imgUrl={datas.image}
                        name={datas.name}
                        email={datas.email}
                    />
                </div>

                <div className='col-span-2 shadow-lg px-5 py-1 rounded-lg'>
                    <p className='font-semibold text-slate-600'>Working on ...</p>
                    <UserProjects projects={datas.memberBoards} />
                </div>
            </div>

            {/* <div className='grid grid-cols-1 md:grid-cols-3 mt-10 pb-5 border-b'>
                <div></div>

                <div className='col-span-2 shadow-lg px-5 py-1 rounded-lg'>
                    <p className='font-semibold text-slate-600'>Works with ...</p>
                    <UserFriends friends={DUMMY_FRIENDS} />
                </div>
            </div> */}
        </>
    )
}

export default UserProfile;