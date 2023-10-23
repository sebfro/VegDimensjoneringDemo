import { DetailedHTMLProps, forwardRef, InputHTMLAttributes, useRef, KeyboardEvent } from 'react';
import styled, { css } from 'styled-components';
import { TextStyles } from '../../../styles/TextStyles';
import { Colors } from '../../../styles/colors';

interface PropTypes
	extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	/**Label to be displayed besides the radio button*/
	label?: string;
	disabled?: boolean;
	checked?: boolean;
	error?: boolean;
	ariaLabel?: string;
}
//TODO: Kan hende at FromRadio skal erstatte den gamle Radio komponenten. Denne er laget for å fungere med react-hook-form.
export const FormRadio = forwardRef<HTMLLabelElement, PropTypes>(
	({ label, disabled, error, ariaLabel, ...props }, ref) => {
		const localRef = useRef<any>(null);
		return (
			<StyledLabelContainer
				tabIndex={0}
				role='radio'
				onKeyDown={(e: KeyboardEvent<HTMLLabelElement>) => {
					// Gjør at bruker kan bruke spacebar og enter for å velge radioknappen
					if (e.key === ' ' || e.key === 'Enter') localRef?.current?.click();
				}}
				ref={ref}
			>
				<input
					type='radio'
					ref={localRef}
					checked={props.checked}
					disabled={disabled}
					tabIndex={-1}
					{...props}
				/>
				<StyledCheckMark error={!!error} aria-label={ariaLabel} />
				{label && <StyledSpan disabled={!!disabled}>{label}</StyledSpan>}
			</StyledLabelContainer>
		);
	}
);
FormRadio.displayName = 'NyRadio';

export default function Radio({
	label,
	onChange,
	onClick,
	disabled = false,
	checked,
	error = false,
	id,
	ariaLabel,
	...props
}: PropTypes) {
	const ref = useRef<any>(null);
	return (
		<StyledLabelContainer
			tabIndex={0}
			role='radio'
			onKeyDown={(e: React.KeyboardEvent<HTMLLabelElement>) => {
				// Gjør at bruker kan bruke spacebar og enter for å velge radioknappen
				if (e.key === ' ' || e.key === 'Enter') ref?.current?.click();
			}}
		>
			<input
				id={id}
				type='radio'
				ref={ref}
				onChange={onChange}
				checked={checked}
				disabled={disabled}
				onClick={onClick}
				tabIndex={-1}
				{...props}
			/>
			<StyledCheckMark error={error} aria-label={ariaLabel} />
			{label && <StyledSpan disabled={disabled}>{label}</StyledSpan>}
		</StyledLabelContainer>
	);
}

const StyledCheckMark = styled.span<{ error: boolean }>`
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	top: 0;
	left: 0;
	height: 32px;
	width: 32px;
	background-color: white;
	border-radius: 100%;
	border: solid 2px ${Colors.primaryTekst};

	:after {
		content: '';
		position: absolute;
		display: none;
	}

	${({ error }) =>
		error &&
		css`
			border: solid 2px var(--red-default);
		`}
`;

const StyledSpan = styled.span<{ disabled: boolean }>`
	color: var(--theme-color);
	${({ disabled }) =>
		disabled &&
		css`
			opacity: 0.4;
		`}
	${TextStyles.BodyMedium};
`;

// Container
const StyledLabelContainer = styled.label`
	:hover input ~ ${StyledCheckMark} {
		background-color: var(--gray-hover);
	}

	input:disabled ~ ${StyledCheckMark} {
		opacity: 0.4;
	}

	input:checked ~ ${StyledCheckMark}:after {
		display: block;
	}

	${StyledCheckMark}:after {
		width: 16px;
		height: 16px;
		border-radius: 100%;
		background: #697277;
	}

	input {
		position: absolute;
		opacity: 0;
		cursor: pointer;
		height: 0;
		width: 0;
	}

	position: relative;
	align-items: center;
	cursor: pointer;
	-webkit-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
	display: flex;
	justify-content: flex-start;
	column-gap: 12px;

	:focus-within {
		${StyledCheckMark} {
			outline: 3px solid ${Colors.oransje};
			outline-offset: 2px;
		}
	}
`;
