import React, { useCallback, useId, useState } from 'react';
import styled, { CSSProperties } from 'styled-components';
import SvgGetter from '../SVG/SvgGetter/SvgGetter';
import { TextStyles } from '../../../styles/TextStyles';
import { Colors } from '../../../styles/colors';
import { FocusBorder, HoverStyle } from '../StyledComponents/Common';

interface CheckboxProps {
	handleOnClick: (value: string) => void;
	flexDirection?: CSSProperties['flexDirection'];
	buttonLabel?: string;
	label?: string;
	className?: string;
	selected?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
	handleOnClick,
	label,
	buttonLabel,
	className,
	flexDirection,
	selected = false,
}) => {
	const [focus, setFocus] = useState(false);

	// Forhindrer at enter tastetrykker submitter hele formen når bruker bare skal krysse av
	const handleKeyPress = useCallback(
		(e: any) => {
			if (e?.key === 'Enter' || e?.key === ' ') handleOnClick(e.target.value);
		},
		[handleOnClick]
	);

	const onClick = useCallback(
		(e: any) => {
			e.preventDefault();
			handleOnClick(e.target.value);
		},
		[handleOnClick]
	);

	const updateFocusState = useCallback((value: boolean) => {
		setFocus(value);
	}, []);

	const id = useId();

	return (
		<Wrapper flexDirection={flexDirection} className={className}>
			<FocusBorder focus={focus}>
				<CustomSpan
					onFocus={() => updateFocusState(true)}
					onBlur={() => updateFocusState(false)}
					tabIndex={0}
					onClick={onClick}
					onKeyDown={handleKeyPress}
					aria-label={label}
					role='checkbox'
					id={id}
				>
					{selected && <SvgGetter icon={'CheckMark'} />}
				</CustomSpan>
			</FocusBorder>
			{buttonLabel && (
				<label htmlFor={id} onClick={onClick}>
					{buttonLabel}
				</label>
			)}
		</Wrapper>
	);
};

export default Checkbox;

const Wrapper = styled.div<{ flexDirection: CSSProperties['flexDirection'] }>`
	display: flex;
	justify-content: center;
	width: fit-content;
	align-items: center;

	label {
		color: ${Colors.mørkSort};
		${TextStyles.BodyLiten};
		font-weight: 300;
		:hover {
			cursor: pointer;
		}
	}

	column-gap: 12px;
	flex-direction: ${({ flexDirection }) => flexDirection};
`;

const CustomSpan = styled.div`
	border: solid 2px ${Colors.sort};
	${HoverStyle};

	:hover {
		cursor: pointer;
	}

	:focus {
		border: 3px solid ${Colors.mørkSort};
	}

	border-radius: 0;
	height: 1.5rem;
	width: 1.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: white;
`;
