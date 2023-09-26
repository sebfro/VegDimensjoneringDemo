import styled from 'styled-components';
import {
	Dimensjonering,
	DimensjoneringProps,
} from '../components/Eksperimenter/Dimensjonering.tsx';
import { Sidebar } from '../components/domain/DimensjoneringsGrunnlag/Sidebar.tsx';
import { LeggTilKnapp } from '../components/atoms/Knapper/LeggTilKnapp.tsx';
import { useCallback, useState } from 'react';
import { LagType, DimensjoneringInitialState } from '../lib/MidlertidigData/Dimensjonering.ts';
import { cloneDeep } from 'lodash';
import { Footer } from '../components/atoms/Footer.tsx';

export const DimensjoneringSide = () => {
	const [dimensjoneringer, setDimensjoneringer] = useState<Pick<DimensjoneringProps, 'lagListe'>[]>(
		[cloneDeep(DimensjoneringInitialState)]
	);

	const oppdaterLagListe = useCallback(
		(lagListe: LagType[], index: number) => {
			const newState = dimensjoneringer.map((mapLagListe, mapIndex) => {
				if (index === mapIndex) return { lagListe };
				return mapLagListe;
			});
			setDimensjoneringer(newState);
		},
		[dimensjoneringer]
	);

	const leggTilDimensjonering = useCallback(() => {
		setDimensjoneringer([...dimensjoneringer, cloneDeep(DimensjoneringInitialState)]);
	}, [dimensjoneringer]);

	return (
		<StyledContainer>
			<Sidebar />
			<DimensjoneringContainer>
				{dimensjoneringer.map((dim, i) => {
					return (
						<Dimensjonering
							key={i}
							oppdaterLagListe={(lagListe) => {
								oppdaterLagListe(lagListe, i);
							}}
							lagListe={dim.lagListe}
						/>
					);
				})}

				<LeggTilKnapp
					tekst='Legg til overbygning'
					icon={'Pluss'}
					onClickCallback={leggTilDimensjonering}
				/>
			</DimensjoneringContainer>
			<Footer />
		</StyledContainer>
	);
};
const DimensjoneringContainer = styled.div`
	margin: 4rem auto;
	min-height: 100dvh;
	display: flex;
	flex-wrap: wrap;
	padding: 0 4rem 15rem;
	align-content: start;
	gap: 4rem;
	width: 100%;
`;

const StyledContainer = styled.div`
	display: grid;
	grid-template-columns: 20rem 1fr;
`;
