import { FC } from 'react';
import styled, { CSSProperties } from 'styled-components';

interface KortProps {
	children: React.ReactNode;
	className?: string;
	color?: CSSProperties['color'];
	tabIndex?: number;
}

const Kort: FC<KortProps> = ({ children, className, color, tabIndex }) => {
	return (
		<StyledKort color={color} className={className} tabIndex={tabIndex}>
			{children}
		</StyledKort>
	);
};

export default Kort;

const StyledKort = styled.div`
	background-color: white;
	border-radius: 0.5rem;
	padding: 1rem 2rem;
	font-size: 1.2rem;
	font-weight: 600;
	transition: all 0.2s ease-in-out;
`;
