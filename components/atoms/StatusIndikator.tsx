import { FC } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { Colors } from '../../styles/colors';
import { AvmerkingsBoks, Dot, IngenNyeBilder } from './SVG';
import { StatusType } from '../../lib/typer/OpplastingTyper.ts';
import { Loader } from './loading/Loader.tsx';

type StørrelseType = 'liten' | 'medium' | 'stor';

interface StatusIndikatorProps {
	status: StatusType;
	className?: string;
	størrelse?: StørrelseType;
}

const StatusIndikator: FC<StatusIndikatorProps> = ({ status, className, størrelse = 'medium' }) => {
	const color = () => {
		if (status === 'ferdig' || status === 'laster opp') {
			return Colors.oransje;
		}
		return Colors.grå;
	};

	const hentConatinerStørrelse = () => {
		switch (størrelse) {
			case 'liten':
				return '1.5rem';
			case 'medium':
				return '2.5rem';
			case 'stor':
				return '4rem';
		}
	};

	const hentSvg = () => {
		switch (status) {
			case 'ferdig':
				return <AvmerkingsBoks pathFill={color()} />;
			case 'laster opp':
				return <Loader size='small' />;
			case 'venter':
				return <Dot />;
			case 'ingen':
				return <IngenNyeBilder />;
		}
	};
	return (
		<StyledStatusIndikator
			className={className}
			størrelse={hentConatinerStørrelse()}
			color={color()}
		>
			{hentSvg()}
		</StyledStatusIndikator>
	);
};

export default StatusIndikator;

const StyledStatusIndikator = styled.div<{
	color: CSSProperties['color'];
	størrelse: CSSProperties['width'];
}>`
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${(props) => props.color};
	width: ${(props) => props.størrelse};
	height: ${(props) => props.størrelse};
`;
