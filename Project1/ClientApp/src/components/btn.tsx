import React from 'react';


interface IBtnProps {
	value?: string,
	className: string,
	text: string,
	onClick: () => void,
}

export function Btn(props: IBtnProps): JSX.Element {
	return (
		<button 
			value={props.value || ''} 
			onClick={props.onClick}
			className={props.className}
		>
			{props.text}
		</button>
	);
}