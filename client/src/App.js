import Layout from './shared/components/layout/Layout';
import Home from './shared/components/home/Home';
// import Auth from './users/pages/Auth'
// import AllKanbanList from './boards/pages/AllKanbanList';
// import NewBoard from './boards/pages/NewBoard';
// import MyKanbanBoard from './boards/pages/MyKanbanBoard';
// import Profile from './users/pages/Profile';

import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, Suspense } from 'react';
import { userActions } from './shared/store/user-slice';
import LoadingSpinner from './shared/components/UI/Spinner/LoadingSpinner';

const Auth = React.lazy(() => import('./users/pages/Auth'));
const AllKanbanList = React.lazy(() => import('./boards/pages/AllKanbanList'));
const NewBoard = React.lazy(() => import('./boards/pages/NewBoard'));
const MyKanbanBoard = React.lazy(() => import('./boards/pages/MyKanbanBoard'));
const Profile = React.lazy(() => import('./users/pages/Profile'));

let logoutTimer;
const App = () => {
    const { token, tokenExpDate } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let routes;
    
    useEffect(() => {
        const datas = JSON.parse(localStorage.getItem('userData'));
        if(datas && datas.token && new Date(datas.expiration) > new Date()) {
            dispatch(userActions.authHandler(
                {user: datas.user, token: datas.token, tokenExpDate: new Date(datas.expiration)}
            ));
        }
    }, [dispatch]);

    useEffect(() => {
        if(token && tokenExpDate){
            const remainingTime = tokenExpDate.getTime() - new Date().getTime();
            logoutTimer = setTimeout(() => {
                dispatch(userActions.logoutHandler());
                navigate('/')
            }, [remainingTime])
        } else {
            clearTimeout(logoutTimer);
            
        }
    }, [token, dispatch, tokenExpDate, navigate]);

    if(token) {
        routes = (
            <>
                <Route path='/' element={<Home />}/>
                <Route path='/:username' element={token ? <Profile /> : <Navigate replace to='/' />}/>
                <Route path='/all-boards' element={token ? <AllKanbanList /> : <Navigate replace to='/' />}/>
                <Route path='/all-boards/join' element={token ? <AllKanbanList /> : <Navigate replace to='/' />}/>
                <Route path='/boards/new' element={token ? <NewBoard /> : <Navigate replace to='/' />}/>
                <Route path='/boards/:bid' element={token ? <MyKanbanBoard /> : <Navigate replace to='/' />}/>
                <Route path='/boards/:bid/update' element={token ? <MyKanbanBoard /> : <Navigate replace to='/' />}/>
                <Route path='/boards/:bid/members' element={token ? <MyKanbanBoard /> : <Navigate replace to='/' />}/>
                <Route path='/boards/:bid/add-task' element={token ? <MyKanbanBoard /> : <Navigate replace to='/' />}/>
                <Route path='/boards/:bid/:tid' element={token ? <MyKanbanBoard /> : <Navigate replace to='/' />}/>
                <Route path='/boards/:bid/delete' element={token ? <MyKanbanBoard /> : <Navigate replace to='/' />}/>
            </>
        )
    } else {
        routes = (
            <>
                <Route path='/' element={<Home />}/>
                <Route path='/authenticate' element={<Auth />}/>        
            </>
        )
    }

    return (
        <Layout>
            <Suspense fallback={<div className='center'><LoadingSpinner /></div>}>
                <Routes>
                    { routes }
                </Routes>
            </Suspense>
        </Layout>
    )
}

export default App;