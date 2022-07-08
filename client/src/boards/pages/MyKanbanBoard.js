import Button from '../../shared/components/UI/Button';
import BoardTable from '../components/MyKanban/BoardTable';
import Modal from '../../shared/components/UI/Modal';
import Input from '../../shared/components/UI/Input/Input';

import { MdOutlineDriveFileRenameOutline } from 'react-icons/md';
import { BsQuestion } from 'react-icons/bs';

import { useEffect, useState } from 'react';

const DUMMY_TABLES = [
    'Backlog', 'In Progress', 'Review', 'Complete'
]

const MyKanbanBoard = () => {
    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState('');
    const [usageArea, setUsageArea] = useState('');
	const [isTouched, setIsTouched] = useState(false);
	const [formError, setFormError] = useState(true);

    const showModalHandler = () => {
        setShowModal(true);
    }

    const closeModalHandler = () => {
        setShowModal(false);
        setTitle('');
        setUsageArea('');
        setIsTouched(false);
        setFormError(true)
    }

    const changeTitleHandler = (e) => {
        setTitle(e.target.value);
        setIsTouched(true);
    }

    const changeUsageHandler = (e) => {
        setUsageArea(e.target.value);
        setIsTouched(true);
    }

    useEffect(() => {
        if(title.length === 0 || usageArea.length < 5) return setFormError(true);
        setFormError(false)
    }, [title.length, usageArea.length])

    return (
        <div className='mt-5'>
            <Button
                type='button'
                className='border border-blue-600 px-5 py-1 rounded-md font-medium hover:bg-blue-600 hover:text-white'
                onClick={showModalHandler}
            >
                Update Board
            </Button>

            <Modal 
                show={showModal} 
                closeHandler={closeModalHandler} 
                modalTitle='Update Kanban Board'
                formError={formError}
                inputs={
                    <>
                        <Input
                            label='Kanban Title'
                            icon={<MdOutlineDriveFileRenameOutline />}
                            iconClass='top-2.5 left-2.5'
                            className='mb-1 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
                            onChange={changeTitleHandler}
                            value={title}
                            style={{ width: '21rem' }}
                            type='text'
                            placeholder='Title'
                            error={isTouched && title.length === 0}
                            errorText='Can not be empty!'
                        />

                        <Input
                            label='Usage Area'
                            icon={<BsQuestion />}
                            iconClass='top-2.5 left-2.5'
                            className='mb-1 border border-slate-700 rounded-3xl p-1 pr-4 pl-12 focus:border-blue-600'
                            onChange={changeUsageHandler}
                            value={usageArea}
                            style={{ width: '21rem' }}
                            type='text'
                            placeholder='What will you use it for? eg: Personal'
                            error={isTouched && usageArea.length < 5}
                            errorText='Can not be less than 5 characters!'
                        />
                    </>
                }
            />

            <div className='grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mt-5 gap-5'>
                {
                    DUMMY_TABLES.map((table, i) => (
                        <BoardTable 
                            key={i}
                            tableTitle={table}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default MyKanbanBoard;