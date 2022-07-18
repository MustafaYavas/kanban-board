const Button = (props) => {
	const { type, className, onClick, disabled, style, children } = props;
	return (
		<button
			type={type}
			className={className}
			onClick={onClick}
			style={style || null}
			disabled={disabled || null}
		>
			{children}
		</button>
	);
};

export default Button;