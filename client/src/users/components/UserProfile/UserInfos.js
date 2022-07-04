const UserInfos = (props) => {
    const { imgUrl, name, job, email } = props;

	return (
		<>
			<div className='w-28 h-28'>
				<img
					className='rounded-full border-2 border-slate-700'
					src={imgUrl}
					alt='profile'
				/>
			</div>

			<div className='mt-5 border-t border-slate-700'>
				<p className='text-2xl font-semibold'>{name}</p>
				<p className='text-lg font-semibold'>{job}</p>
				<p className='text-md font-medium'>{email}</p>
			</div>
		</>
	);
};

export default UserInfos;
