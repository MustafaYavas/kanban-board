import Layout from './shared/components/layout/Layout';
import Home from './shared/components/home/Home';
import Auth from './users/pages/Auth';
import AllKanbanList from './boards/pages/AllKanbanList';
import NewBoard from './boards/pages/NewBoard';
import MyKanbanBoard from './boards/pages/MyKanbanBoard'
import Profile from './users/pages/Profile';

import { Navigate, Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

const App = () => {
    const { isLoggedIn } = useSelector(state => state.user);

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/authenticate' element={<Auth />}/>
                <Route path='/:username' element={isLoggedIn ? <Profile /> : <Navigate replace to='/' />}/>
                <Route path='/all-boards' element={isLoggedIn ? <AllKanbanList /> : <Navigate replace to='/' />}/>
                <Route path='/all-boards/join' element={isLoggedIn ? <AllKanbanList /> : <Navigate replace to='/' />}/>
                <Route path='/boards/new' element={isLoggedIn ? <NewBoard /> : <Navigate replace to='/' />}/>
                <Route path='/boards/:bid' element={isLoggedIn ? <MyKanbanBoard /> : <Navigate replace to='/' />}/>
                <Route path='/boards/:bid/update' element={isLoggedIn ? <MyKanbanBoard /> : <Navigate replace to='/' />}/>
                <Route path='/boards/:bid/members' element={isLoggedIn ? <MyKanbanBoard /> : <Navigate replace to='/' />}/>
                <Route path='/boards/:bid/add-task' element={isLoggedIn ? <MyKanbanBoard /> : <Navigate replace to='/' />}/>
                <Route path='/boards/:bid/:tid' element={isLoggedIn ? <MyKanbanBoard /> : <Navigate replace to='/' />}/>
            </Routes>
        </Layout>
    )
}

export default App;