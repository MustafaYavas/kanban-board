import LoadingSpinner from '../../../shared/components/UI/Spinner/LoadingSpinner';
import ErrorLayout from '../../../shared/components/UI/ErrorLayout';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const UserProjects = (props) => {
    const { projects } = props;
    const [userProjects, setUserProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    
    useEffect(() => {
        setIsLoading(true);
        const fetchDatas = async() => {
            const projectsArray = [];
            for(let i=0; i<projects.length; i++) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/${projects[i]}`);
                    const responseData = await response.json();
                    if(!response.ok) {
                        throw new Error(responseData.message);
                    }
                    projectsArray.push(responseData);
                } catch (error) {
                    setError('Someting went wrong while fetchig user datas. Please try again later!');
                }
            }
            setUserProjects(projectsArray);
            setIsLoading(false);
        }
        fetchDatas();
    }, [projects]);

	return (
        <>
            <ErrorLayout error={error} />
            {
                projects.length === 0 && 
                <p className='mt-5 text-center text-red-600 font-semibold '>Not working on any projects yet</p>
            }

            <div>
                {isLoading && <LoadingSpinner asOverlay />}
                {
                    projects.length > 0 && userProjects.map(project => (
                        <Link
                            key={project.board.id}
                            to={`/boards/${project.board.id}`}
                        >
                            <div 
                                className='flex justify-between items-center my-3 py-2 px-5 rounded shadow-md bg-slate-700 text-white hover:bg-slate-600'
                            >
                                <p className='font-medium'>{project.board.title}</p>
                                <p className='text-sm'>{project.board.usageArea}</p>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>
	);
};

export default UserProjects;
