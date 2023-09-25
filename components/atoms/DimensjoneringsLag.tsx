import styled, { css, CSSProperties } from 'styled-components';
import { FC } from 'react';
import { ArcherElement } from 'react-archer';
import { Colors } from '../../styles/colors.ts';
import { TextStyles } from '../../styles/TextStyles.ts';
import { LagType, MaterialeType } from '../../lib/MidlertidigData/Dimensjonering.ts';

interface LagProps {
	lagListe: LagType[];
	fargeMap: Map<MaterialeType, CSSProperties['color']>;
}

export const DimensjoneringsLag: FC<LagProps> = ({ lagListe, fargeMap }) => {
	const mmIPiksler =
		500 /
		lagListe.reduce((acc, lag) => {
			return acc + lag.høyde;
		}, 0);
	const indent = 10;
	const maksIndex = indent * lagListe.length;
	let accHøyde = 0;
	const antallLag = lagListe.reduce((acc, lag) => {
		return lag.aktiv ? acc + 1 : acc;
	}, 0);
	return lagListe
		.filter((lag) => lag.aktiv)
		.map((lag, index) => {
			if (!lag.aktiv) return;
			accHøyde += lag.høyde;
			return (
				<ArcherElement id={'rektangel' + index} key={index}>
					<Rad>
						<Rektangel
							høyde={lag.høyde * mmIPiksler}
							color={fargeMap.get(lag.materiale) || 'black'}
							key={index}
							indent={maksIndex - index * indent}
						/>
						<Tick columnGap={index === antallLag - 1 ? '14px' : '24px'}>
							<Linje bredde={index === antallLag - 1 ? '1rem' : '0.5rem'} />
							<p>{accHøyde}</p>
						</Tick>
					</Rad>
				</ArcherElement>
			);
		});
};

const Rektangel = styled.div<{ høyde: number; indent: number; color: CSSProperties['color'] }>`
	height: ${(props) => props.høyde}px;
	${({ indent }) => css`
		width: calc(100% - ${indent}px);
	`};
	background-color: ${(props) => props.color};
	border-top-right-radius: 5px;
	border: 1px solid ${Colors.lysGrå};
`;

const Tick = styled.div<{ columnGap: CSSProperties['columnGap'] }>`
	position: relative;
	height: 0;
	bottom: 0;
	left: calc(100% - 2px);
	display: flex;
	align-items: end;
	${({ columnGap }) => css`
		column-gap: ${columnGap};
	`};
	p {
		position: relative;
		bottom: -6px;
		${TextStyles.BodyLiten};
		font-weight: 300;
	}
`;

const Rad = styled.div``;

const Linje = styled.div<{ bredde?: CSSProperties['width'] }>`
	${({ bredde = '0.5rem' }) =>
		css`
			width: ${bredde};
		`};
	height: 0.0625rem;
	background: var(--colors-borders-primary-border-color, #858d90);
`;
