import Modal from '../../../../shared/components/UI/Modal';

import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ShowMembers = () => {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const navigate = useNavigate();

    const showModalHandler = () => {
        setShowModal(true);
        navigate('/boards/1/members');
    }

    const closeModalHandler = () => {
        setShowModal(false);
        navigate('/boards/1');
    }

    const showMemberHandler = () => {

    }

    useEffect(() => {
        setModalContent(<>Members</>)
    }, [])

    return (
        <>
            <Link
                    to='/boards/1/members'
                    className='p-2'
                    onClick={showModalHandler}
                >
                Members
            </Link>

            <Modal 
                show={showModal} 
                closeHandler={closeModalHandler} 
                modalTitle='Members'
                content={modalContent}
                modalFunc={showMemberHandler}
            />
        </>
    )
}

export default ShowMembers;