import styled from 'styled-components';
import { Dimensjonering } from '../components/Eksperimenter/Dimensjonering.tsx';
import { Sidebar } from '../components/domain/DimensjoneringsGrunnlag/Sidebar.tsx';
import { AddButtom } from '../components/atoms/Knapper/AddButtom.tsx';
import { useCallback, useState } from 'react';
import {
	DimensjoneringsLagInitialState,
	DimensjoneringsLagType,
	LagType,
} from '../lib/MidlertidigData/Dimensjonering.ts';
import { cloneDeep } from 'lodash';
import { Footer } from '../components/atoms/Footer.tsx';
import OverbygningHeader from '../components/domain/Overbygning/OverbygningHeader.tsx';

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
			<Wrapper>
				<OverbygningHeader title={'E39 Oppedal - Vågsmyren'} />
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
				</DimensjoneringContainer>
				<StyledAddButton
					tekst='Legg til overbygning'
					icon={'Pluss'}
					onClickCallback={leggTilDimensjonering}
				/>
				<StyledFooter />
			</Wrapper>
		</StyledContainer>
	);
};

const Wrapper = styled.div`
	margin: 0 auto;
	padding: 4rem 4rem 10rem;
	width: 100%;
	height: 100%;
	position: relative;
`;

const DimensjoneringContainer = styled.div`
	//min-height: 100dvh;
	display: flex;
	//grid-template-columns: repeat(auto-fit, minmax(40rem, 62rem));
	flex-wrap: wrap;
	align-content: start;
	gap: 4rem;
	width: 100%;
`;

const StyledContainer = styled.div`
	display: grid;
	grid-template-columns: 20rem calc(100% - 20rem);
	::-webkit-scrollbar {
		width: 0.5rem;
	}
`;

const StyledAddButton = styled(AddButtom)`
	margin-top: 1.5rem;
	width: 100%;
	max-width: 62rem;
`;

const StyledFooter = styled(Footer)`
	// Trekker fra paddingen rundt StyledContainer komponeneter med position absolute ikke ta hensyn til det når det kommer til width
	width: calc(100% - 8rem);
`;
