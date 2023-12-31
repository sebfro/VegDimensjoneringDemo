import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';

import SvgGetter from '../../SVG/SvgGetter/SvgGetter';
import { DropdownArrowContainer, SelectWrapper, StyledOption } from '../InputStyling';
import { Colors } from '../../../../styles/colors';
import { TextStyles } from '../../../../styles/TextStyles';

export interface DropdownProps {
	options: string[];
	value: string;
	handleOnChange: (value: string) => void;
	className?: string;
	placeholder?: string;
	disablePlaceholder?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({
	options,
	value,
	handleOnChange,
	className,
	placeholder = 'Velg ett alternativ...',
	disablePlaceholder = true,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const handleKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLSelectElement>) => {
			if (event.key === 'Enter') {
				setIsOpen(!isOpen);
			}
		},
		[isOpen]
	);
	return (
		<SelectWrapper className={className} placeholderSelected={value === ''}>
			<SelectContaienr selectIsOpen={isOpen}>
				<StyledSelect
					onClick={() => setIsOpen(!isOpen)}
					onBlur={() => setIsOpen(false)}
					onKeyDown={handleKeyDown}
					value={value}
					onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleOnChange(e.target.value)}
				>
					<StyledOption className='default' value='' disabled={disablePlaceholder}>
						{placeholder}
					</StyledOption>
					{options.map((o, i) => (
						<StyledOption value={o} key={o + i.toString()}>
							{o.charAt(0) + o.slice(1).toLowerCase()}
						</StyledOption>
					))}
				</StyledSelect>
				<DropdownArrowContainer>
					<SvgGetter icon={'PilNed'} />
				</DropdownArrowContainer>
			</SelectContaienr>
		</SelectWrapper>
	);
};

export default Dropdown;

const SelectContaienr = styled.div<{ selectIsOpen: boolean }>`
	position: relative;

	:focus-within {
		outline: 2px solid ${Colors.oransje};
	}

	${({ selectIsOpen }) =>
		selectIsOpen &&
		css`
			svg {
				rotate: 180deg;
			}
		`}
	select {
		${TextStyles.BodyLiten};
	}
`;

const StyledSelect = styled.select`
	${TextStyles.BodyLiten};
	width: 100%;
	height: 48px;
	background-color: white;
	color: ${Colors.mørkSort};
	padding: 0 0 0 1rem;

	:hover {
		cursor: pointer;
	}
`;
