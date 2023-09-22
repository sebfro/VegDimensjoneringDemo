import styled, { CSSProperties } from 'styled-components';
import CheckBox from '../atoms/Inputs/CheckBox.tsx';
import Dropdown from '../atoms/Inputs/Dropdown.tsx';
import UnitInput from '../atoms/Inputs/UnitInput.tsx';
import { ArcherContainer, ArcherElement } from 'react-archer';
import { Colors } from '../../styles/colors.ts';
import { DimensjoneringsLag } from '../atoms/DimensjoneringsLag.tsx';
import { FC, useCallback } from 'react';
import { TextStyles } from '../../styles/TextStyles.ts';
import Kort from '../atoms/Kort.tsx';
import {
	LagType,
	LagTyperFargeMap,
	MaterialeListe,
	MaterialeType,
} from '../../lib/MidlertidigData/Dimensjonering.ts';

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

	const genererInputFelt = () => {
		return lagListe.map((lag, index) => {
			if (!lag.aktiv) return;
			return (
				<ArcherElement
					id={'unitInput' + index}
					key={index}
					relations={[
						{
							targetId: 'rektangel' + index,
							targetAnchor: 'left',
							sourceAnchor: 'right',
							style: {
								lineStyle: 'curve',
								endShape: {
									arrow: {
										arrowLength: 0,
										arrowThickness: 0,
									},
								},
							},
						},
					]}
				>
					<UnitInput
						onChangeCallback={(value) => handleEndreTykkelse(value, index)}
						value={lagListe[index].høyde.toString()}
					/>
				</ArcherElement>
			);
		});
	};

	const handleEndreMateriale = useCallback(
		(value: string, index: number) => {
			const tempLagLsite = lagListe.slice();
			tempLagLsite[index].materiale = value as MaterialeType;
			oppdaterLagListe(tempLagLsite);
		},
		[lagListe, oppdaterLagListe]
	);

	const genererDropdown = () => {
		return lagListe.map((lag, index) => {
			if (!lag.aktiv) return;
			return (
				<Dropdown
					key={index}
					options={MaterialeListe}
					value={lagListe[index].materiale}
					handleOnChange={(value) => handleEndreMateriale(value, index)}
				/>
			);
		});
	};

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
			<CheckboxKolonne>
				<HeaderOne>Lag</HeaderOne>
				<CheckboxContainer>
					{lagListe.map((checkBox, index) => (
						<CheckBox
							handleOnClick={() => handleToggleCheckbox(index)}
							buttonLabel={checkBox.navn}
							key={index}
							selected={checkBox.aktiv}
						/>
					))}
				</CheckboxContainer>
			</CheckboxKolonne>
			<ArcherContainer strokeColor={Colors.grå}>
				<BæreEvneGruppe>
					<HeaderOne>Materiale</HeaderOne>
					<InputKolonne>{genererDropdown()}</InputKolonne>
					<HeaderOne>Tykkelse</HeaderOne>
					<InputKolonne>{genererInputFelt()}</InputKolonne>
					<LagContainer>
						<Lagene>
							<LinjeWrapper>
								<Linje />
								<p>0</p>
							</LinjeWrapper>
							<DimensjoneringsLag fargeMap={LagTyperFargeMap} lagListe={lagListe} />
						</Lagene>
					</LagContainer>
					<Målestokk></Målestokk>
				</BæreEvneGruppe>
			</ArcherContainer>
		</StyledKort>
	);
};

const StyledKort = styled(Kort)`
	display: grid;
	grid-template-columns: 1fr 3fr;
	height: min-content;
`;

const CheckboxKolonne = styled.div`
	height: 100%;
	display: grid;
	justify-content: start;
	flex-direction: column;
	grid-template-rows: 82px auto;

	input {
		width: fit-content;
	}
`;

const CheckboxContainer = styled.div`
	display: grid;
	row-gap: 1.5rem;
	grid-template-rows: repeat(auto-fit, 32px);
`;

const BæreEvneGruppe = styled.div`
	height: 100%;
	width: 100%;
	display: grid;
	grid-template-columns: 2fr 1fr 1fr 1.5fr;
	grid-template-areas:
		'materiale tykkelse . . .'
		'materialeInput tykkelseInput linjer lag målestokk';
	grid-auto-flow: column;
	column-gap: 1rem;
	padding-right: 3rem;
	grid-template-rows: 82px auto;

	h1 {
		align-self: center;
	}
`;

const Lagene = styled.div`
	display: flex;
	flex-direction: column;
	border-right: 1px dashed #858d90;
`;

const LagContainer = styled.div`
	grid-row: 2;
	grid-column: 4;
`;

const Målestokk = styled.div`
	grid-row: 2;
	grid-column: 5;
`;

const InputKolonne = styled.div`
	display: grid;
	align-content: start;
	row-gap: 1rem;
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

const HeaderOne = styled.h1`
	${TextStyles.BodyLiten};
	font-weight: 600;
	align-self: center;
	color: ${Colors.primaryTekst};
`;
