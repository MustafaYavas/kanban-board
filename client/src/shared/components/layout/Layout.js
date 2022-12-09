import MainNavigation from '../Navigation/MainNavigation.js'

const Layout = (props) => {
    const { children } = props
    
    return (
        <>
            <MainNavigation />
            { children }
        </>
    )
}

export default Layout;