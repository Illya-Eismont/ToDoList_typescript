import React , { useState } from 'react';

interface ITextToggleProps {
	text: string,
	editItem: (text: string) => void
}

export function TextToggle(props: ITextToggleProps): JSX.Element {
	
	const [value, setValue] = useState(false);
	const [text, setText] = useState(props.text);

	const onKeyDown = (event: React.KeyboardEvent) => {
		if(event.keyCode === 13 || event.keyCode === 27){
			props.editItem(text);
			setValue(!value);
		}
	}

	if(!value){
		return (
			<label
				onDoubleClick={() => setValue(!value)} 
				className="toggle-text"
			>
				{text}
			</label>
		);
	}

	return (
		<textarea 
			name='toggle-input'
			value={text}
			onChange={ event => setText(event.currentTarget.value)}
			onKeyDown={onKeyDown}
			onBlur={() => { props.editItem(text); setValue(!value); }}
			></textarea>
	);
}