

const Select = (props) => {
    const { name, className, options } = props

    return (
        <select 
            name={name}
            className={className}
        >
            {
                options.map((option, i) => (
                    <option key={i} value={option.value}>{option.text}</option>
                ))
            }
        </select>
    )
}

export default Select;