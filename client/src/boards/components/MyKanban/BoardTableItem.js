import Button from '../../../shared/components/UI/Button';

import { AiOutlinePlus, AiOutlineClose } from 'react-icons/ai';

const BoardTableItem = () => {
    return (
        <>
            <div className='rounded-lg bg-white mx-3 mt-5 py-2 shadow-lg'>
                <p className='bg-blue-500 text-white rounded-md text-center ml-2 w-1/2'>Low Priority</p>
                <p className='ml-2 mt-2'>Company Web Design</p>
                <div className='flex justify-between items-center mt-2'>
                    <img 
                        className='mx-2 self-end h-8 w-8'
                        style={{borderRadius: '50%'}} 
                        src='https://picsum.photos/id/59/200/300' 
                        alt='person'
                    />

                    <div className='flex justify-center items-center'>
                        <Button
                            className='border rounded-full h-8 w-8 flex justify-center items-center'
                        >
                            <AiOutlinePlus />
                        </Button>

                        <Button
                            className='border rounded-full h-8 w-8 flex justify-center items-center mx-2'
                        >
                            <AiOutlineClose />
                        </Button>
                    </div>
                    
                </div>
            </div>

            <div className=' rounded-lg bg-white mx-3 mt-5 py-2 shadow-lg'>
                <p className='bg-green-500 text-white rounded-md text-center ml-2 w-1/2'>Med Priority</p>
                <p className='ml-2 mt-2'> Dashboard Layout Design</p>
                <div className='flex justify-between items-center mt-2'>
                    <img 
                        className='mx-2 h-8 w-8'
                        style={{borderRadius: '50%'}} 
                        src='https://picsum.photos/id/56/200/300' 
                        alt='person'
                    />

                    <div className='flex justify-center items-center'>
                        <Button
                            className='border rounded-full h-8 w-8 flex justify-center items-center'
                        >
                            <AiOutlinePlus />
                        </Button>

                        <Button
                            className='border rounded-full h-8 w-8 flex justify-center items-center mx-2'
                        >
                            <AiOutlineClose />
                        </Button>
                    </div>
                   
                </div>
            </div>

            <div className='rounded-lg bg-white mx-3 mt-5 py-2 shadow-lg'>
                <p className='bg-red-500 text-white rounded-md text-center ml-2 w-1/2'>High Priority</p>
                <p className='ml-2 mt-2'>Navigation Designs</p>
                <div className='flex justify-between items-center mt-2'>
                    <img 
                        className='mx-2 h-8 w-8'
                        style={{borderRadius: '50%'}} 
                        src='https://picsum.photos/id/127/200/300' 
                        alt='person'
                    />

                    <div className='flex justify-center items-center'>
                        <Button
                            className='border rounded-full h-8 w-8 flex justify-center items-center'
                        >
                            <AiOutlinePlus />
                        </Button>

                        <Button
                            className='border rounded-full h-8 w-8 flex justify-center items-center mx-2'
                        >
                            <AiOutlineClose />
                        </Button>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default BoardTableItem;