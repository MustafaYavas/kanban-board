import Header from '../navigation/MainNavigation'

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