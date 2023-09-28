import styled, { CSSProperties } from 'styled-components';
import { ArcherContainer } from 'react-archer';
import { Colors } from '../../styles/colors.ts';
import { DimensjoneringsLag } from '../atoms/DimensjoneringsLag.tsx';
import { FC, useCallback } from 'react';
import { TextStyles } from '../../styles/TextStyles.ts';
import Kort from '../atoms/Kort.tsx';
import {
	DimensjoneringsLagType,
	LagNavn,
	LagType,
	LagTyperFargeMap,
	MaterialeType,
} from '../../lib/MidlertidigData/Dimensjonering.ts';
import BæreEvne from '../domain/Overbygning/BæreEvne.tsx';
import { BodyLitenTekst, TittelMediumTekst } from '../atoms/TekstKomponenter.ts';
import IkonKnapp from '../atoms/Knapper/IkonKnapp.tsx';
import { cloneDeep } from 'lodash';
import { DimensionContext } from '../../lib/context/dimensionContext.tsx';

export interface DimensjoneringProps {
	lagListe: Map<DimensjoneringsLagType, LagType[]>;
	oppdaterLagListe: (params: {
		lagListe: LagType[];
		dimensjoneringsLag: DimensjoneringsLagType;
	}) => void;
	mmIPiksler: number;
}

export const Dimensjonering: FC<DimensjoneringProps> = ({
	lagListe,
	oppdaterLagListe,
	mmIPiksler,
}) => {
	const hentLag = useCallback(
		(dimLagType: DimensjoneringsLagType, lagNavn: LagNavn[]) => {
			const nyState = cloneDeep(lagListe);
			const nyLagListe = nyState.get(dimLagType);
			const indexList: number[] = [];
			nyLagListe?.forEach((lag, index) => {
				if (lagNavn.includes(lag.navn)) {
					indexList.push(index);
				}
			});
			return { nyLagListe, indexList };
		},
		[lagListe]
	);
	const handleEndreTykkelse = useCallback(
		(value: string, dimLagType: DimensjoneringsLagType, lagNavn: LagNavn[]) => {
			const { nyLagListe, indexList } = hentLag(dimLagType, lagNavn);
			if (nyLagListe && indexList.length > 0) {
				indexList.forEach((index) => {
					nyLagListe[index].høyde = +value;
				});
				oppdaterLagListe({
					lagListe: nyLagListe,
					dimensjoneringsLag: dimLagType,
				});
			}
		},
		[hentLag, oppdaterLagListe]
	);

	const handleEndreMateriale = useCallback(
		(value: string, dimLagType: DimensjoneringsLagType, lagNavn: LagNavn[]) => {
			const { nyLagListe, indexList } = hentLag(dimLagType, lagNavn);
			if (nyLagListe && indexList.length > 0) {
				indexList.forEach((index) => {
					nyLagListe[index].materiale = value as MaterialeType;
				});
				oppdaterLagListe({
					lagListe: nyLagListe,
					dimensjoneringsLag: dimLagType,
				});
			}
		},
		[hentLag, oppdaterLagListe]
	);

	const handleToggleCheckbox = useCallback(
		(dimLagType: DimensjoneringsLagType, lagNavn: Pick<LagType, 'aktiv' | 'navn'>[]) => {
			let { nyLagListe } = hentLag(
				dimLagType,
				lagNavn.map((lag) => lag.navn)
			);
			console.log(nyLagListe);
			if (nyLagListe) {
				nyLagListe = nyLagListe.map((lag, index) => {
					return { ...lag, ...lagNavn[index] };
				});
				oppdaterLagListe({
					lagListe: nyLagListe,
					dimensjoneringsLag: dimLagType,
				});
			}
		},
		[hentLag, oppdaterLagListe]
	);

	return (
		<StyledKort>
			<ArcherContainer strokeColor={Colors.grå}>
				<KortHeader>
					<TitteOgRedigerKnapp>
						<TittelMediumTekst>Hovedveg 1 </TittelMediumTekst>
						<IkonKnapp ikon='Rediger' iconSize={2.5} />
					</TitteOgRedigerKnapp>
					<StyledBodyLitenTekst>Silt, leire, T4, CU? 50 kPa</StyledBodyLitenTekst>
					<Grupper>
						<BodyLitenTekst>Bæreevnegruppe 3</BodyLitenTekst>
						<BodyLitenTekst>Trafikkgruppe A</BodyLitenTekst>
					</Grupper>
				</KortHeader>
				<KortInnhold>
					<DimensionContext.Provider
						value={{
							handlers: { handleEndreTykkelse, handleToggleCheckbox, handleEndreMateriale },
						}}
					>
						<BæreEvne dimLagMap={lagListe} />
					</DimensionContext.Provider>
					<LagContainer>
						<Lagene>
							<LinjeWrapper>
								<Linje />
								<p>0</p>
							</LinjeWrapper>
							<DimensjoneringsLag
								mmIPiksler={mmIPiksler}
								fargeMap={LagTyperFargeMap}
								layerMap={lagListe}
							/>
						</Lagene>
					</LagContainer>
					<Målestokk />
				</KortInnhold>
			</ArcherContainer>
		</StyledKort>
	);
};

const KortInnhold = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 3fr 1fr 1fr 3rem;
`;

const StyledKort = styled(Kort)`
	height: min-content;
	width: 100%;
`;

const Lagene = styled.div`
	display: flex;
	flex-direction: column;
	border-right: 1px dashed #858d90;
`;

const LagContainer = styled.div`
	grid-column: 3;
	margin-top: 2.5rem;
`;

const Målestokk = styled.div`
	grid-column: 4;
`;

const Linje = styled.div<{ bredde?: CSSProperties['width'] }>`
	width: 1rem;
	height: 0.0625rem;
	background: var(--colors-borders-primary-border-color, #858d90);
`;

const LinjeWrapper = styled.div`
	position: relative;
	left: calc(100% - 0.5rem);
	display: flex;
	align-items: start;
	column-gap: 1.5rem;
	height: 0;

	p {
		position: relative;
		top: -8px;
		${TextStyles.BodyLiten};
		font-weight: 300;
	}
`;

const KortHeader = styled.div`
	display: flex;
	margin-bottom: 1.5rem;
	align-items: center;
`;

const TitteOgRedigerKnapp = styled.div`
	align-items: center;
	display: flex;
	column-gap: 1.5rem;
	margin-right: 2rem;
`;

const StyledBodyLitenTekst = styled(BodyLitenTekst)`
	margin-right: 2rem;
`;

const Grupper = styled.div`
	display: flex;
	column-gap: 1rem;
`;
