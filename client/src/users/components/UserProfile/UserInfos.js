const UserInfos = (props) => {
    const { imgUrl, name, email } = props;

	return (
		<>
			<div className='w-28 h-28'>
				<img
					className='rounded-full border-2 border-white'
					src={imgUrl}
					alt='profile'
				/>
			</div>

			<div className='mt-3 border-t border-white text-white text-center'>
				<p className='text-2xl font-semibold'>{name}</p>
				<p className='text-md font-normal'>{email}</p>
			</div>
		</>
	);
};

export default UserInfos;