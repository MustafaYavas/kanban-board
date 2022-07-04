const UserProjects = (props) => {
    const { projects } = props;

	return (
		<div className='px-2'>
			{
                projects.map(project => (
                    <div key={project.id} className='my-3 p-2 bg-slate-100 rounded shadow-md'>
                        {project.title}
                    </div>
                ))
            }
		</div>
	);
};

export default UserProjects;
