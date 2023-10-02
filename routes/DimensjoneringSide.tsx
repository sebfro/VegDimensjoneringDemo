import styled from 'styled-components';
import { Dimensjonering } from '../components/Eksperimenter/Dimensjonering.tsx';
import { Sidebar } from '../components/domain/DimensjoneringsGrunnlag/Sidebar.tsx';
import { LeggTilKnapp } from '../components/atoms/Knapper/LeggTilKnapp.tsx';
import { useCallback, useState } from 'react';
import {
	DimensjoneringsLagInitialState,
	DimensjoneringsLagType,
	LagType,
} from '../lib/MidlertidigData/Dimensjonering.ts';
import { cloneDeep } from 'lodash';
import { Footer } from '../components/atoms/Footer.tsx';

export const DimensjoneringSide = () => {
	const [dimensjoneringer, setDimensjoneringer] = useState<
		Map<DimensjoneringsLagType, LagType[]>[]
	>([cloneDeep(DimensjoneringsLagInitialState)]);

	const oppdaterLagListe = useCallback(
		(params: {
			lagListe: LagType[];
			dimensjoneringsLag: DimensjoneringsLagType;
			index: number;
		}) => {
			const nyState = cloneDeep(dimensjoneringer);
			nyState[params.index].set(params.dimensjoneringsLag, params.lagListe);
			setDimensjoneringer(nyState);
		},
		[dimensjoneringer]
	);

	const leggTilDimensjonering = useCallback(() => {
		setDimensjoneringer([...dimensjoneringer, cloneDeep(DimensjoneringsLagInitialState)]);
	}, [dimensjoneringer]);

	// Alle dimensjonering skal være realtive til den søtrste/tjukkeste.
	const kalkulererMmIPiksler = useCallback(() => {
		let tjukkeste = 0;
		dimensjoneringer.forEach((map) => {
			const dimTykkelse = Array.from(map.values()).reduce((acc, curr) => {
				return acc + curr.reduce((acc, curr) => (curr.aktiv ? acc + curr.høyde : acc), 0);
			}, 0);
			if (dimTykkelse > tjukkeste) tjukkeste = dimTykkelse;
		});
		return 336 / tjukkeste;
	}, [dimensjoneringer]);
	return (
		<StyledContainer>
			<Sidebar />
			<DimensjoneringContainer>
				{dimensjoneringer.map((dim, index) => {
					return (
						<Dimensjonering
							key={index}
							oppdaterLagListe={(params) => oppdaterLagListe({ ...params, index })}
							lagListe={dim}
							mmIPiksler={kalkulererMmIPiksler()}
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
