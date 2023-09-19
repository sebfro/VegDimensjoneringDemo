import { FC } from 'react';
import styled, { css, CSSProperties } from 'styled-components';
import { Colors } from '../../styles/colors';
import { FilerType, StatusType } from '../../lib/typer/OpplastingTyper.ts';

interface ProgresjonBarProps {
	filer: FilerType;
	status?: StatusType;
	className?: string;
}

const ProgresjonBar: FC<ProgresjonBarProps> = ({ filer, status, className }) => {
	const hentProgresjon = () => {
		if (status !== 'laster opp') return 0;
		let progresjon = (filer.opplastet / filer.antall) * 100;
		if (progresjon > 100) {
			progresjon = 100;
		}
		return progresjon + '%';
	};
	return (
		<Loader className={className} lasterOpp={status === 'laster opp'}>
			<ProgressBar prosent={hentProgresjon()} />
		</Loader>
	);
};

export default ProgresjonBar;

//https://css-tricks.com/css3-progress-bars/
const Loader = styled.div<{ lasterOpp: boolean }>`
	grid-row: 2;
	grid-column: 2 / 5;
	height: 0.2rem;
	position: relative;

	${({ lasterOpp }) =>
		lasterOpp
			? css`
					background-color: rgba(255, 150, 0, 0.3);
			  `
			: css`
					background-color: rgba(156, 156, 156, 0.3);
					height: 0.1rem;
			  `}
	> span {
		display: block;
		height: 100%;
		background-color: ${Colors.oransje};
		background-image: linear-gradient(center bottom, rgb(43, 194, 83) 37%, rgb(84, 240, 84) 69%);
		position: relative;
		overflow: hidden;
	}
`;

const ProgressBar = styled.span<{ prosent: CSSProperties['width'] }>`
	width: ${(props) => props.prosent};
`;
