const UserFriends = (props) => {
    const { friends } = props

	return (
		<div className='px-2 flex flex-row justify-start items-center'>
            {
                friends.map(friend => (
                    <div key={friend.id} className='my-3 p-2 rounded w-20 h-20 flex flex-col justify-center items-center'>
                        <img
                            className='rounded-full'
                            src={friend.imgUrl}
                            alt='profile'
                        />
                        {friend.name}
                    </div>
                ))
            }
		</div>
	);
};

export default UserFriends;
