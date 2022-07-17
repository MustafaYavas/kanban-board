import Layout from './shared/components/layout/Layout';
import Home from './shared/components/home/Home';
import Auth from './users/pages/Auth';
import AllKanbanList from './boards/pages/AllKanbanList';
import NewBoard from './boards/pages/NewBoard';
import MyKanbanBoard from './boards/pages/MyKanbanBoard'
import Profile from './users/pages/Profile';

import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userActions } from './shared/store/user-slice';

let logoutTimer;

const App = () => {
    const { token, tokenExpDate } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let routes;
    
    useEffect(() => {
        const datas = JSON.parse(localStorage.getItem('userData'));
        if(datas && datas.token && new Date(datas.expiration) > new Date()) {
            dispatch(userActions.loginHandler(
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
            <Routes>
                { routes }
            </Routes>
        </Layout>
    )
}

export default App;