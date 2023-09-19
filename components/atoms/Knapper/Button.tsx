import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import styled from 'styled-components';
import { TextStyles } from '../../../styles/TextStyles.ts';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	tekst: string;
	className?: string;
	children?: ReactNode;
	laster?: boolean;
}

const Button: FC<ButtonProps> = ({ tekst, className, children, laster, ...props }) => {
	return (
		<StyledButton {...props} className={className} disabled={laster}>
			{children && children}
			<span>{tekst}</span>
		</StyledButton>
	);
};
export default Button;

const StyledButton = styled.button`
	white-space: nowrap;
	padding: 1rem 2rem;
	:not(:disabled) {
		cursor: pointer;
	}
	${TextStyles.Knapp};
	display: flex;
	align-items: center;
	justify-content: center;
	column-gap: 1rem;
	width: 100%;
`;
