import LoadingSpinner from '../../../../shared/components/UI/Spinner/LoadingSpinner';
import ErrorLayout from '../../../../shared/components/UI/ErrorLayout';

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { boardActions } from '../../../../shared/store/kanban-slice';
import { useNavigate } from 'react-router-dom';

const SelectBoard = (props) => {
    const { title } = props;
    const user = useSelector(state => state.user).user;
    const board = useSelector(state => state.board);
    const [boardDatas, setBoardDatas] = useState([]);
    const [boardTitles, setBoardTitles] = useState([]);
    const [boardIds, setBoardIds] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchDatas = async() => {
            let datas = [];
            let titles = [];
            let ids = [];
            for(let i = 0; i < user.memberBoards.length; i++) {
                try {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/${user.memberBoards[i]}`);
                    const responseData = await response.json();
                    if(!response.ok) {
                        throw new Error(responseData.message);
                    }
                    datas.push(responseData.board);
                    titles.push(responseData.board.title);
                    ids.push(responseData.board.id);
                } catch (error) {
                    
                }
            }
            setBoardDatas(datas);
            setBoardTitles(titles);
            setBoardIds(ids);
        }
        fetchDatas();
    }, [user.memberBoards, board]);

    const selectHandler = (e) => {
        const fetchData = async() => {
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/boards/${boardIds[boardTitles.findIndex(t => t === e.target.value)]}`);
                const responseData = await response.json();
                if(!response.ok) {
                    throw new Error(responseData.message);
                }
                dispatch(boardActions.setCurrentBoard(responseData.board));
                navigate(`/boards/${responseData.board.id}`);
            } catch (error) {
                setError('Someting went wrong while fetchig board datas. Please try again later!');
            }
            setIsLoading(false);
        }
        fetchData();
    }

	return (
		<>
            <ErrorLayout error={error} />
            {isLoading && <LoadingSpinner asOverlay />}
            <select 
                onChange={selectHandler} 
                className='border border-rose-900 rounded-md font-medium text-rose-600 px-5 text-lg'
                value={title}
            >
                {
                    boardDatas.map(board => (
                        <option key={board.id} value={board.title}>{board.title}</option>
                    ))
                }
            </select>
        </>
	);
};

export default SelectBoard;