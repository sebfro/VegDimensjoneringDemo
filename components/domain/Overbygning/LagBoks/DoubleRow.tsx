import { FC, useCallback, useContext } from 'react';
import {
	DimensjoneringsLagType,
	LagNavn,
	LagType,
} from '../../../../lib/MidlertidigData/Dimensjonering';
import styled, { css } from 'styled-components';
import { Colors } from '../../../../styles/colors';
import { MaterialeBoks, TransparangDropdown } from '../MaterialeBoks';
import { TykkelseBoks } from '../TykkelseBoks';
import Checkbox from '../../../atoms/Inputs/CheckBox.tsx';
import { DimensionContext } from '../../../../lib/context/dimensionContext.tsx';

interface MultiLagBoksProps {
	lag: LagType[];
	dimensjoneringsLagType: DimensjoneringsLagType;
}
export const DoubleRow: FC<MultiLagBoksProps> = ({ lag, dimensjoneringsLagType }) => {
	const { handlers } = useContext(DimensionContext);
	const handleDropdown = useCallback(
		(value: string) => {
			const chosenDimLayers: Pick<LagType, 'aktiv' | 'navn'>[] =
				(value as LagNavn) === lag[0].navn
					? [
							{ aktiv: true, navn: lag[0].navn },
							{ aktiv: false, navn: lag[1].navn },
					  ]
					: [
							{ aktiv: true, navn: lag[0].navn },
							{ aktiv: true, navn: lag[1].navn },
					  ];
			handlers.handleToggleCheckbox(dimensjoneringsLagType, chosenDimLayers);
		},
		[dimensjoneringsLagType, handlers, lag]
	);
	const handleCheckbox = useCallback(() => {
		let newDimLayerActiveState: Pick<LagType, 'aktiv' | 'navn'>[] = [
			{ aktiv: true, navn: lag[0].navn },
			{ aktiv: false, navn: lag[1].navn },
		];
		console.log(lag[0].navn);
		if (lag[0].aktiv) {
			newDimLayerActiveState = [
				{ aktiv: false, navn: lag[0].navn },
				{ aktiv: false, navn: lag[1].navn },
			];
		}
		handlers.handleToggleCheckbox(dimensjoneringsLagType, newDimLayerActiveState);
	}, [dimensjoneringsLagType, handlers, lag]);

	const getDropdownValue = useCallback((): LagNavn => {
		let value: LagNavn = 'Bærelag (øvre)';
		lag.forEach((lag) => {
			if (lag.navn === 'Bærelag (øvre + nedre)' && lag.aktiv) value = 'Bærelag (øvre + nedre)';
		});
		return value;
	}, [lag]);

	const generateMaterialAndThickness = useCallback(
		(lag: LagType) => {
			return (
				<>
					<MaterialeBoks borderTop={true} lag={lag} dimLagType={dimensjoneringsLagType} />
					<TykkelseBoks lag={lag} borderTop={true} dimLagType={dimensjoneringsLagType} />
				</>
			);
		},
		[dimensjoneringsLagType]
	);

	return (
		<Rad>
			<Container borderTop={false} borderBottom={false}>
				<ChooseLayer>
					<Checkbox handleOnClick={handleCheckbox} selected={lag[0].aktiv} />
					<TransparangDropdown
						value={getDropdownValue()}
						options={lag.map((lag) => lag.navn)}
						handleOnChange={handleDropdown}
					/>
				</ChooseLayer>
			</Container>
			{lag.map((lag) => generateMaterialAndThickness(lag))}
		</Rad>
	);
};

const Rad = styled.div`
	display: grid;
	grid-template-columns: auto 160px 110px;
	grid-template-rows: repeat(2, min-content);
	max-height: 6rem;
	width: 100%;
	align-items: center;
	--border-style: 1px solid;
`;

const Container = styled.div<{ borderBottom: boolean; borderTop: boolean }>`
	border-color: ${Colors.grå};
	display: flex;
	padding: 0 0.75rem 0 1rem;
	height: 100%;
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
	border-left: var(--border-style);
	grid-row: 1 / 3;
	align-items: start;
`;

const ChooseLayer = styled.div`
	display: flex;
	column-gap: 0.5rem;
	align-items: center;
`;
