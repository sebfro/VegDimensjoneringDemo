import React, { FC, forwardRef, Ref } from 'react';
import { LagType, MaterialeListe } from '../../../lib/MidlertidigData/Dimensjonering';
import styled, { css } from 'styled-components';
import { Colors } from '../../../styles/colors';
import CheckBox from '../../atoms/Inputs/CheckBox.tsx';
import Dropdown from '../../atoms/Inputs/Dropdown.tsx';
import MilimeterInput from '../../atoms/Inputs/MilimeterInput.tsx';
import { ArcherElement } from 'react-archer';
import { BodyLitenTekst } from '../../atoms/TekstKomponenter.ts';

interface BæreEvneProps {
	lagListe: LagType[];
	handlers: {
		handleEndreTykkelse: (value: string, index: number) => void;
		handleToggleCheckbox: (index: number) => void;
		handleEndreMateriale: (value: string, index: number) => void;
	};
}
const BæreEvne: FC<BæreEvneProps> = forwardRef<Ref<HTMLDivElement>, BæreEvneProps>(
	(
		{ lagListe, handlers: { handleEndreTykkelse, handleToggleCheckbox, handleEndreMateriale } },
		ref
	) => {
		const genererInputFelt = (lag: LagType, borderTop: boolean, index: number) => {
			// if (!lag.aktiv) return;
			return (
				<ArcherElement
					id={'bæreevneRad' + index}
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
					<TykkelseBokser borderTop={borderTop}>
						<StyledMilimeterInput
							onChangeCallback={(value) => handleEndreTykkelse(value, index)}
							value={lag.høyde.toString()}
						/>
					</TykkelseBokser>
				</ArcherElement>
			);
		};
		const genererRader = () => {
			return lagListe.map((lag, index) => {
				const borderTop = index === 0;
				return (
					<Rad key={index} ref={ref as React.RefObject<HTMLDivElement>}>
						<LagBokser borderTop={borderTop} borderBottom={lag.navn !== 'Bærelag'}>
							<CheckBox
								handleOnClick={() => handleToggleCheckbox(index)}
								selected={lag.aktiv}
								buttonLabel={lag.navn}
							/>
						</LagBokser>
						<MaterialeBokser borderTop={borderTop}>
							<StyledDropdown
								options={MaterialeListe}
								value={lag.materiale}
								handleOnChange={(value) => handleEndreMateriale(value, index)}
							/>
						</MaterialeBokser>
						{genererInputFelt(lag, borderTop, index)}
					</Rad>
				);
			});
		};
		return (
			<Container>
				<TittelRad>
					<BodyLitenTekst>Lag</BodyLitenTekst>
					<KolonneTittel>Materiale</KolonneTittel>
					<KolonneTittel>Tykkelse</KolonneTittel>
				</TittelRad>
				{genererRader()}
			</Container>
		);
	}
);

BæreEvne.displayName = 'BæreEvne';
export default BæreEvne;

const Container = styled.div`
	display: grid;
	align-content: center;
	max-width: 29.5rem;
	grid-template-rows: repeat(8, min-content);
`;

const Rad = styled.div`
	display: grid;
	grid-template-columns: auto 160px 110px;
	width: 100%;
	align-items: center;
	--border-style: 1px solid;
`;

const TittelRad = styled(Rad)`
	padding-bottom: 1rem;
`;

const Boks = styled.div`
	border-color: ${Colors.grå};
	height: 100%;
	display: flex;
`;

const StyledDropdown = styled(Dropdown)`
	select {
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}
`;

const MaterialeBokser = styled(Boks)<{ borderTop: boolean }>`
	padding: 0.5rem 0.5rem;
	border-bottom: var(--border-style);
	${({ borderTop }) =>
		borderTop &&
		css`
			border-top: var(--border-style);
		`};
	:hover,
	:focus-within {
		padding: 0.5rem 0.5rem calc(0.5rem - 1px);
		border-bottom: 2px solid ${Colors.oransje};
	}
`;

const LagBokser = styled(Boks)<{ borderBottom: boolean; borderTop: boolean }>`
	padding: 0.5rem 1rem;
	${({ borderBottom }) =>
		borderBottom &&
		css`
			border-bottom: var(--border-style);
		`};
	${({ borderTop }) =>
		borderTop &&
		css`
			border-top: var(--border-style);
		`};
	border-right: var(--border-style);
`;

const StyledMilimeterInput = styled(MilimeterInput)`
	background-color: transparent;
	width: 5rem;
	margin-left: 0.5rem;
	input {
		background-color: transparent;
		width: 2rem;
	}
`;

const TykkelseBokser = styled(Boks)<{ borderTop: boolean }>`
	display: flex;
	align-items: center;
	justify-content: start;
	border-bottom: var(--border-style);
	border-left: var(--border-style);
	border-right: var(--border-style);
	${({ borderTop }) =>
		borderTop &&
		css`
			border-top: var(--border-style);
		`};
	:hover,
	:focus-within {
		${StyledMilimeterInput} {
			padding: 0.75rem 0.5rem calc(0.75rem - 1px);
		}
		border-bottom: 2px solid ${Colors.oransje};
	}
`;

const KolonneTittel = styled(BodyLitenTekst)`
	padding-left: 1rem;
`;
