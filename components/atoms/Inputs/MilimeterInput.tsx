import React, { BaseSyntheticEvent, forwardRef, Ref, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';

import { Colors } from '../../../styles/colors';
import { TextStyles } from '../../../styles/TextStyles';
import { formatNumber } from '../../../lib/Utils/formatHelpers';
import { BodyLitenTekst } from '../TekstKomponenter.ts';

interface UnitInputProps {
	onChangeCallback: (value: string) => void;
	className?: string;
	value?: string;
	disabled?: boolean;
	placeholder?: string;
	error?: boolean;
}

const MilimeterInput: React.FC<UnitInputProps> = forwardRef<Ref<HTMLDivElement>, UnitInputProps>(
	(
		{ onChangeCallback, className, value = '', disabled = false, placeholder = '', error = false },
		ref
	) => {
		const handleOnChange = useCallback(
			(e: BaseSyntheticEvent) => {
				e.preventDefault();
				// Fjerner eventuelle tusen seperatorer
				const numericValue = e.target.value.replace(/ /g, '');
				// Verdi resettes dersom de ikke er et tall
				onChangeCallback(/^\d+$/.test(numericValue) ? numericValue : '');
			},
			[onChangeCallback]
		);

		const inputRef = useRef<HTMLInputElement>(null);

		const formattedValue = formatNumber(value);

		return (
			<InputWrapper
				className={className}
				error={error}
				ref={ref as React.RefObject<HTMLDivElement>}
			>
				<StyledInput
					placeholderStyle={value === '' || value === undefined}
					disabled={disabled}
					type='text'
					inputMode='numeric'
					pattern='[\d\s]+'
					value={formattedValue || ''}
					placeholder={placeholder}
					onChange={handleOnChange}
					className='no-spinner'
					ref={inputRef}
				/>
				<BodyLitenTekst>mm</BodyLitenTekst>
			</InputWrapper>
		);
	}
);

MilimeterInput.displayName = 'UnitInput';

export default MilimeterInput;

export const StyledInput = styled.input<{ placeholderStyle: boolean }>`
	color: ${Colors.mørkSort};
	${({ placeholderStyle }) =>
		placeholderStyle
			? css`
					${TextStyles.LabelType}
			  `
			: css`
					${TextStyles.BodyLiten}
			  `};
	border: none;
	outline: none;
	-webkit-appearance: textfield;
	appearance: textfield;
	width: 5ch;
	height: 26px;
`;

const InputWrapper = styled.div<{ error: boolean }>`
	${TextStyles.BodyMedium};
	padding: 0.75rem 0.5rem;
	height: 3rem;
	box-sizing: border-box;
	color: ${Colors.mørkSort};
	background-color: white;
	display: flex;
	justify-content: space-between;
	overflow: hidden;
	align-items: center;
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
	}

	${({ error }) =>
		error &&
		css`
			border-color: ${Colors.rød};
		`};
`;
