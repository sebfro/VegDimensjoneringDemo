import React, { BaseSyntheticEvent, forwardRef, Ref, useCallback, useRef } from 'react';
import styled, { css } from 'styled-components';

import { Colors } from '../../../styles/colors';
import FocusOutline from '../StyledComponents/FocusOutline';
import { TextStyles } from '../../../styles/TextStyles';
import { HoverStyle } from '../StyledComponents/Common';
import { formatNumber } from '../../../lib/Utils/formatHelpers';
import { BodyLitenTekst } from '../TekstKomponenter.ts';

export type Unit = 'millimeter' | 'meter';

const UnitTextMap = new Map<Unit, string>([
	['millimeter', 'mm'],
	['meter', 'meter'],
]);

interface UnitInputProps {
	onChangeCallback: (value: string) => void;
	className?: string;
	unit?: Unit;
	value?: string;
	disabled?: boolean;
	placeholder?: string;
	error?: boolean;
}

const UnitInput: React.FC<UnitInputProps> = forwardRef<Ref<HTMLDivElement>, UnitInputProps>(
	(
		{
			onChangeCallback,
			className,
			unit = 'millimeter',
			value = '',
			disabled = false,
			placeholder = '',
			error = false,
		},
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
			<StyledFocusOutline>
				<InputWrapper
					unit={unit}
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
						unit={unit}
						className='no-spinner'
						ref={inputRef}
					/>
					<BodyLitenTekst>{UnitTextMap.get(unit)}</BodyLitenTekst>
				</InputWrapper>
			</StyledFocusOutline>
		);
	}
);

UnitInput.displayName = 'UnitInput';

export default UnitInput;

export const StyledInput = styled.input<{ placeholderStyle: boolean; unit: Unit }>`
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

const InputWrapper = styled.div<{ unit: Unit; error: boolean }>`
	${TextStyles.BodyMedium};
	border: 2px solid ${Colors.sort};
	${HoverStyle};
	color: ${Colors.mørkSort};
	background-color: white;
	padding: 12px 16px;
	height: 48px;
	display: flex;
	column-gap: ${({ unit }) => (unit === 'millimeter' ? '0px' : '16px')};
	justify-content: space-between;
	overflow: hidden;
	align-items: center;
	width: ${({ unit }) => (unit === 'millimeter' ? '150px' : '216px')};

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

const StyledFocusOutline = styled(FocusOutline)`
	width: min-content;
`;
