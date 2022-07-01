import banner from '../../../assets/banner.png';

import { Link } from 'react-router-dom'

const Home = () => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 h-full'>
            <div className='flex flex-col justify-center items-start ml-10'>
                <h1 className='text-8xl text-blue-600 font-bold'>Kanban</h1>
                <h3 className='text-4xl text-blue-600 font-bold pb-16 '>Visualize your workflow</h3>

                <div className='border-b-8 border-blue-600 w-2/6' />

                <div className='text-sky-600 mt-16'>
                    <p className='text-2xl'>
                        Plan and advance your business in the most accurate way by visualizing your workflow
                    </p>

                    <div className='flex justify-start items-center'>
                        <Link
                            to='/authenticate'
                            className='rounded-3xl px-6 py-2 mt-6 text-white bg-gradient-to-r from-blue-600 to-sky-400 mr-10'
                        >
                            Get Started 
                        </Link>

                        <a
                            className='rounded-3xl px-6 py-2 mt-6 text-white bg-gradient-to-r from-blue-600 to-sky-400'
                            href='https://en.wikipedia.org/wiki/Kanban_board'
                            target='_blank'
                            rel='noreferrer'
                        >
                            More About Kanban 
                        </a>
                    </div>
                </div>
            </div>
            
            
            <div className='mt-4'>
                <img src={banner} className='inline-block h-full align-middle' alt='banner'/>
            </div>
        </div>
    )
}

export default Home;