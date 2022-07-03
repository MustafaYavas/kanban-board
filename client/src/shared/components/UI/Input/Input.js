import styles from "./Input.module.css";

const Input = (props) => {
	const {label, icon, className, iconClass, style, type, min, max, placeholder } = props;

	return (
		<>
			{label && 
				<div className='text-center'>
					<label>{label}</label>
				</div>
			}
			<div className={styles.input}>
				<div className={`${styles.icon} ${iconClass}`}>{icon}</div>
				<input
					className={className}
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
