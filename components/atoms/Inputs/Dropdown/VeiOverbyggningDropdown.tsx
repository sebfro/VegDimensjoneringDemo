import { useCallback, useId, useState } from 'react';
import styled, { css } from 'styled-components';

import { DropdownArrowContainer, SelectWrapper, StyledOption } from '../InputStyling';
import { TextStyles } from '../../../../styles/TextStyles';
import { Colors } from '../../../../styles/colors';
import SvgGetter from '../../SVG/SvgGetter/SvgGetter';
import { capitalizeString } from '../../../../lib/Utils/formatHelpers';

export const ConvertListToOptions = <T,>(list: T[]) =>
	list.map((l) => {
		return { displayText: l, value: l };
	});

export type NumberOptions = TypedDropdownProps<number>['options'];

export interface TypedDropdownProps<T> {
	options: { displayText: string; value: T }[];
	value: string;
	handleOnChange: (value: T) => void;
	labelText?: string;
	className?: string;
	error?: boolean;
	placeholder?: string;
	disablePlaceholder?: boolean;
	shouldCapitalizeDisplayText?: boolean;
}

/**
 *
 * @param options { displayText: string; value: T }[]. displayText er teksten som vises i select-en.
 * value er objektet som returners ved onChange event.
 * @param labelText
 * @param value Må matche med en av value'ene i options.
 * @param handleOnChange
 * @param className
 * @param	error Hvis den er satt til true blir border rød
 * @param placeholder
 * @param disablePlaceholder. Boolean som sier om bruker kan velge placeholder i dropdownen
 * @param shouldCapitalizeDisplayText
 * @constructor
 */
const TypedDropdown = <T,>({
	options,
	value,
	handleOnChange,
	labelText,
	className,
	error,
	placeholder = 'Velg ett alternativ...',
	disablePlaceholder = true,
	shouldCapitalizeDisplayText = true,
}: TypedDropdownProps<T>) => {
	const [isOpen, setIsOpen] = useState(false);
	const id = useId();
	const placeholderValue = '';

	const handleOnChangeCallback = useCallback(
		(event: React.ChangeEvent<HTMLSelectElement>) => {
			const selectedValue = options.find((o) => o.value + '' === event.target?.value);
			if (selectedValue?.value) {
				handleOnChange(selectedValue.value);
			} else {
				if (!disablePlaceholder && event.target.value === placeholderValue) {
					handleOnChange(placeholderValue as any);
				}
			}
		},
		[disablePlaceholder, handleOnChange, options]
	);

	const mappedOptions = options?.map(({ displayText, value }, i) => {
		const stringOrNumberValue: string | number = isNaN(+value) ? (value as string) : +value;
		return (
			<StyledOption value={stringOrNumberValue} key={displayText + i.toString()}>
				{shouldCapitalizeDisplayText ? capitalizeString(displayText) : displayText}
			</StyledOption>
		);
	});
	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLSelectElement>) => {
			if (event.key === 'Enter' || event.key === ' ') {
				setIsOpen(!isOpen);
			}
		},
		[isOpen]
	);

	return (
		<SelectWrapper className={className} placeholderSelected={value === ''} error={error}>
			{labelText && <Label htmlFor={id}>{labelText} </Label>}
			<SelectContaienr selectIsOpen={isOpen}>
				<StyledSelect
					id={id}
					onClick={() => setIsOpen(!isOpen)}
					onBlur={() => setIsOpen(false)}
					value={value}
					onChange={handleOnChangeCallback}
					onKeyDown={handleKeyDown}
				>
					<StyledOption value={placeholderValue} disabled={disablePlaceholder}>
						{placeholder}
					</StyledOption>
					{mappedOptions}
				</StyledSelect>
				<DropdownArrowContainer>
					<SvgGetter icon={'PilNed'} />
				</DropdownArrowContainer>
			</SelectContaienr>
		</SelectWrapper>
	);
};

export default TypedDropdown;

const SelectContaienr = styled.div<{ selectIsOpen: boolean }>`
	position: relative;
	${({ selectIsOpen }) =>
		selectIsOpen &&
		css`
			svg {
				rotate: 180deg;
			}
		`}
`;

const Label = styled.label`
	display: block;
	color: ${Colors.primaryTekst};
	${TextStyles.LabelType};
	margin: 0 0 8px;
`;

const StyledSelect = styled.select`
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	height: 47px;
	${TextStyles.BodyLiten};
	width: 100%;
	color: ${Colors.mørkSort};
	padding: 0 0 0 1rem;

	:hover {
		cursor: pointer;
	}
`;
