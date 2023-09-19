import styled, { CSSProperties } from 'styled-components';
import { useEffect } from 'react';

type Rektangel = {
	høyde: number;
	bredde: number;
	farge: CSSProperties['color'];
};

export const FlexDimensjonering = () => {
	const rektangel: Rektangel[] = [
		{ høyde: 33, bredde: 20, farge: 'red' },
		{ høyde: 22, bredde: 30, farge: 'black' },
		{ høyde: 34, bredde: 40, farge: 'blue' },
		{ høyde: 224, bredde: 50, farge: 'brown' },
	];
	const genererLag = () => {
		return rektangel.map((rektangel, index) => {
			return <Lag {...rektangel} key={index} color={rektangel.farge} />;
		});
	};

	useEffect(() => {
		document.getElementsByName('');
	}, []);
	return <Container>{genererLag()}</Container>;
};

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;

const Lag = styled.div<Rektangel>`
	height: ${(props) => props.høyde}px;
	width: ${(props) => props.bredde}px;
	background-color: ${(props) => props.color};
	display: flex;
`;
