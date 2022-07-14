import Modal from '../../../shared//components/UI/Modal';
import { boardActions } from '../../../shared//store/kanban-slice'

import { AiOutlineClose } from 'react-icons/ai';
import { FaGreaterThan, FaLessThan } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

const BoardTableItem = (props) => {
    const { task } = props;
	const board = useSelector(state => state.board).board;
	const user = useSelector(state => state.user).user;
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();

	const showModalHandler = () => {
		setShowModal(true);
	} 

	const closeModalHandler = () => {
		setShowModal(false);
		navigate(`/boards/${board.id}`)
	}

	const deleteTaskHandler = async() => {
		const newTasks = board.tasks.filter(t => t.id !== task.id);
		try {
			const response = await fetch(`http://localhost:5000/api/boards/boards/${params.bid}`, {
				method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newTasks)
			});
			const responseData = await response.json();
            if(!response.ok) {
                throw new Error(responseData.message);
            }
			dispatch(boardActions.updateCurrentBoardTasks(newTasks))
		} catch (error) {
			
		}
	}

	return (
		<>

			<div className='rounded-lg bg-white mx-3 mt-5 py-2 shadow-lg'>
				<div className='flex justify-between items-center'>
					{task.taskPriority === 'Low' && (
						<p className='bg-blue-500 text-white rounded-md text-center ml-2 w-1/2'>
							Low Priority
						</p>
					)}

					{task.taskPriority === 'Med' && (
						<p className='bg-green-500 text-white rounded-md text-center ml-2 w-1/2'>
							Med Priority
						</p>
					)}

					{task.taskPriority === 'High' && (
						<p className='bg-red-500 text-white rounded-md text-center ml-2 w-1/2'>
							High Priority
						</p>
					)}

					<div className='flex justify-end'>
						{
							task.taskTable !== 'Backlog' &&
							<Link
								to={`/boards/${board.id}`}
								onClick={showModalHandler} 
								className='border rounded-full h-8 w-8 flex justify-center items-center mx-2 hover:bg-fuchsia-500 hover:text-white'
							>
								<FaLessThan />
							</Link>
						}

						{
							task.taskTable !== 'Complete' &&
								<Link
								to={`/boards/${board.id}`}
								onClick={showModalHandler} 
								className='border rounded-full h-8 w-8 flex justify-center items-center mx-2 hover:bg-pink-500 hover:text-white'
							>
								<FaGreaterThan />
							</Link>
						}
					</div>
				</div>

				<p className='ml-2 mt-2'>{task.taskName}</p>
				<div className='flex justify-between items-center mt-2'>
					<img
						className='mx-2 self-end h-8 w-8'
						style={{ borderRadius: '50%' }}
						src={task.img}
						alt='person'
					/>

					{
						board.owner === user.id && 
						<Link 
							to={`/boards/${board.id}/${task.id}`}
							onClick={showModalHandler} 
							className='border rounded-full h-8 w-8 flex justify-center items-center mx-2 hover:bg-red-600 hover:text-white'>
							<AiOutlineClose />
						</Link>
					}
				</div>
			</div>

			<Modal 
                show={showModal} 
                closeHandler={closeModalHandler} 
                modalTitle='Delete task'
                content={<p>Are you sure you want to delete this task</p>}
                modalFunc={deleteTaskHandler}
                buttonText='Delete'
            />
		</>
	);
};

export default BoardTableItem;
