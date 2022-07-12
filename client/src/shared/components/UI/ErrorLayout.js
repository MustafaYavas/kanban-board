import ErrorModal from './ErrorModal';

const ErrorLayout = (props) => {
    const { error } = props

    return (
        <>
            {
                error && 
                <ErrorModal 
                    header='Error!'
                    text={error}
                />
            }
        </>
    )
}

export default ErrorLayout;