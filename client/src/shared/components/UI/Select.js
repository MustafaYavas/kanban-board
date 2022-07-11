const Select = (props) => {
    const { name, className, options, onChange, value } = props

    return (
        <select 
            name={name}
            className={className}
            onChange={onChange}
        >
            {
                options.map((option, i) => (
                    <option key={i} value={value}>{option}</option>
                ))
            }
        </select>
    )
}

export default Select;