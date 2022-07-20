import styles from './Input.module.css';

const Input = (props) => {
	const { label, icon, className, onChange, value, iconClass, style, type, min, max, placeholder, error, errorText } = props;

	return (
		<>
			{label && 
				<div className='mb-2 mt-4 font-semibold'>
					<label>{label}</label>
				</div>
			}
			<div className={styles.input}>
				<div className={`${styles.icon} ${iconClass}`}>{icon}</div>
				<input
					className={className}
					onChange={onChange}
					value={value}
					style={style}
					type={type}
					min={min}
					max={max}
					placeholder={placeholder}
				/>
				{
					error && <p className='text-sm text-red-600 ml-3'>{errorText}</p>
				}
			</div>
		</>
	);
};

export default Input;