import UserFriends from './UserFriends';
import UserInfos from './UserInfos';
import UserProjects from './UserProjects';

const DUMMY_PROJECTS = [
    {id: 1, title: 'Kanban Project 1'},
    {id: 2, title: 'Kanban Project 2'},
    {id: 3, title: 'Kanban Project 3'}
];

const DUMMY_FRIENDS = [
    {id: 1, imgUrl: 'https://randomuser.me/api/portraits/women/56.jpg', name: 'User 1'},
    {id: 2, imgUrl: 'https://randomuser.me/api/portraits/men/96.jpg', name: 'User 2'},
    {id: 3, imgUrl: 'https://randomuser.me/api/portraits/men/27.jpg', name: 'User 3'}
];

const UserProfile = () => {
    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-3 mt-10 pt-5 border-t'>
            
                <div className='flex flex-col justify-center items-center'>
                    <UserInfos 
                        imgUrl='https://randomuser.me/api/portraits/women/96.jpg'
                        name='User Name'
                        job='User Job'
                        email='User Email'
                    />
                </div>

                <div className='col-span-2 shadow-lg px-5 py-1 rounded-lg'>
                    <p className='font-semibold text-slate-600'>Working on ...</p>
                    <UserProjects projects={DUMMY_PROJECTS} />
                </div>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-3 mt-10 pb-5 border-b'>
                <div></div>

                <div className='col-span-2 shadow-lg px-5 py-1 rounded-lg'>
                    <p className='font-semibold text-slate-600'>Works with ...</p>
                    <UserFriends friends={DUMMY_FRIENDS} />
                </div>
            </div>
        </>
    )
}

export default UserProfile;