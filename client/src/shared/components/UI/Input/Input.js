import styles from "./Input.module.css";

const Input = (props) => {
	const { label, icon, className, onChange, value, iconClass, style, type, min, max, placeholder } = props;

	return (
		<>
			{label && 
				<div className='my-1 font-semibold'>
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
			</div>
		</>
	);
};

export default Input;
