import styled, { CSSProperties } from 'styled-components';
import { ArcherContainer } from 'react-archer';
import { Colors } from '../../styles/colors.ts';
import { DimensjoneringsLag } from '../atoms/DimensjoneringsLag.tsx';
import { FC, useCallback } from 'react';
import { TextStyles } from '../../styles/TextStyles.ts';
import Kort from '../atoms/Kort.tsx';
import {
	LagType,
	LagTyperFargeMap,
	MaterialeType,
} from '../../lib/MidlertidigData/Dimensjonering.ts';
import BæreEvne from '../domain/Overbygning/BæreEvne.tsx';
import { BodyLitenTekst, TittelMediumTekst } from '../atoms/TekstKomponenter.ts';
import IkonKnapp from '../atoms/Knapper/IkonKnapp.tsx';

export interface DimensjoneringProps {
	lagListe: LagType[];
	oppdaterLagListe: (lagListe: LagType[]) => void;
}

export const Dimensjonering: FC<DimensjoneringProps> = ({ lagListe, oppdaterLagListe }) => {
	const handleEndreTykkelse = useCallback(
		(value: string, index: number) => {
			const tempLagLsite = lagListe.slice();
			tempLagLsite[index].høyde = +value;
			oppdaterLagListe(tempLagLsite);
		},
		[lagListe, oppdaterLagListe]
	);

	const handleEndreMateriale = useCallback(
		(value: string, index: number) => {
			const tempLagLsite = lagListe.slice();
			tempLagLsite[index].materiale = value as MaterialeType;
			oppdaterLagListe(tempLagLsite);
		},
		[lagListe, oppdaterLagListe]
	);

	const handleToggleCheckbox = useCallback(
		(index: number) => {
			const tempLagLsite = [...lagListe];
			tempLagLsite[index].aktiv = !tempLagLsite[index].aktiv;
			oppdaterLagListe(tempLagLsite);
		},
		[lagListe, oppdaterLagListe]
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
					<BæreEvne
						lagListe={lagListe}
						handlers={{
							handleEndreTykkelse,
							handleToggleCheckbox,
							handleEndreMateriale,
						}}
					/>
					<LagContainer>
						<Lagene>
							<LinjeWrapper>
								<Linje />
								<p>0</p>
							</LinjeWrapper>
							<DimensjoneringsLag fargeMap={LagTyperFargeMap} lagListe={lagListe} />
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
