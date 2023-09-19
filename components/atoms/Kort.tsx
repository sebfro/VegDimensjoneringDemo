import { FC } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { Colors } from '../../styles/colors.ts';

interface KortProps {
	children: React.ReactNode;
	className?: string;
	color?: CSSProperties['color'];
}

const Kort: FC<KortProps> = ({ children, className, color }) => {
	return (
		<StyledKort color={color} className={className}>
			{children}
		</StyledKort>
	);
};

export default Kort;

const StyledKort = styled.div`
	background-color: white;
	//border: 1px solid ${Colors.hvit};
	//color: ${Colors.hvit};
	border-radius: 1.5rem;
	padding: 1rem 2rem;
	font-size: 1.2rem;
	font-weight: 600;
	transition: all 0.2s ease-in-out;
`;
