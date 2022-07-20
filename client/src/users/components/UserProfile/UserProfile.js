import UserInfos from './UserInfos';
import UserProjects from './UserProjects';
import styles from './UserProfile.module.css';
import profileBg from '../../../assets/profile.jpg';

const UserProfile = (props) => {
    const { datas } = props;
    
    return (
        <div className={`${styles['main-container']} shadow-md`}>  
            <div className={`${styles['img-container']}`}>
                <img className={styles.img} src={profileBg} alt='bg'/>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-3`}>
                <div className='flex flex-col justify-center items-center bg-gradient-to-r from-amber-600 to-orange-600 rounded-bl-lg py-1'>
                    <UserInfos 
                        imgUrl={datas.image}
                        name={datas.name}
                        email={datas.email}
                    />
                </div>

                <div className='col-span-2 shadow-lg px-5 py-1 rounded-r-lg'>
                    <p className='font-semibold text-slate-700'>Working on ...</p>
                    <UserProjects projects={datas.memberBoards}/>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;