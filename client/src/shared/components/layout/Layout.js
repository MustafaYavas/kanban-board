import Header from '../Navigation/MainNavigation'

const Layout = (props) => {
    const { children } = props
    
    return (
        <>
            <Header />
            { children }
        </>
    )
}

export default Layout;