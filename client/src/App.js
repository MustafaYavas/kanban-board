import Layout from './shared/components/layout/Layout';
import Home from './shared/components/home/Home';
import Auth from './users/pages/Auth';
import AllKanbanList from './boards/pages/AllKanbanList';
import NewBoard from './boards/pages/NewBoard';
import KanbanBoard from './boards/pages/KanbanBoard'

import { Route, Routes } from 'react-router-dom';


const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/authenticate' element={<Auth />}/>
                <Route path='/all-boards' element={<AllKanbanList />}/>
                <Route path='/boards/new' element={<NewBoard />}/>
                <Route path='/boards/:id' element={<KanbanBoard />}/>
            </Routes>
        </Layout>
    )
}

export default App;