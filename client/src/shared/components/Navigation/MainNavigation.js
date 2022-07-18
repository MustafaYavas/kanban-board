import logo from '../../../assets/logo.png';
import styles from './MainNavigation.module.css';
import { userActions } from '../../store/user-slice';
import { boardActions } from '../../store/kanban-slice';

import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const MainNavigation = () => {
	const user = useSelector(state => state.user);
	const dispatch = useDispatch();
	
	const logoutHandler = () => {
		dispatch(userActions.logoutHandler());
		dispatch(boardActions.clearCurrentBoard());
		localStorage.removeItem('userData');
	}
	
	return (
		<div className='flex justify-between items-center'>
			<Link to='/' className='flex justify-center items-center'>
				<img className={styles.logo} src={logo} alt='logo' />
				<h1 className='font-medium text-lg'>React Kanban</h1>
			</Link>

			<div className={styles.links}>
				{
					user.isLoggedIn && 
					<>
						<NavLink
							to={`/${user.user.username}`}
							className={ (navData) => navData.isActive ? 'border-b-2 border-blue-600' : '' }
						>
							Profile
						</NavLink>

						{
							user.user.ownBoards.length > 0 ?
							<NavLink
								to={`/boards/${user.user.ownBoards[0]}`}
								className={ (navData) => navData.isActive ? 'border-b-2 border-blue-600' : '' }
							>
								My kanban
							</NavLink> :
							user.user.memberBoards.length > 0 &&
							<NavLink
								to={`/boards/${user.user.memberBoards[0]}`}
								className={ (navData) => navData.isActive ? 'border-b-2 border-blue-600' : '' }
							>
								My kanban
							</NavLink>
						}

						<NavLink
							to='/all-boards'
							className={ (navData) => navData.isActive ? 'border-b-2 border-blue-600' : '' }
						>
							Kanbans
						</NavLink>

						<NavLink
							to='/boards/new'
							className={ (navData) => navData.isActive ? 'border-b-2 border-blue-600' : '' }
						>
							New
						</NavLink>

						<Link
							to='/'
							onClick={logoutHandler}
						>
							Logout
						</Link>
						</>
				}

				{
					!user.isLoggedIn &&
					<NavLink
						to='/authenticate'
						className={ (navData) => navData.isActive ? 'border-b-2 border-blue-600' : '' }
					>
						Login
					</NavLink>
				}
			</div>
		</div>
	);
};

export default MainNavigation;