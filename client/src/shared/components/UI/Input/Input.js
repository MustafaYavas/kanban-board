import styles from "./Input.module.css";

const Input = (props) => {
	const { icon, className, iconClass, style, type, placeholder } = props;

	return (
		<div className={styles.input}>
			<div className={`${styles.icon} ${iconClass}`}>{icon}</div>
			<input
				className={className}
				style={style}
				type={type}
				placeholder={placeholder}
			/>
		</div>
	);
};

export default Input;
