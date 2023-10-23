import { createContext } from 'react';
import { DimensjoneringsLagType, LagNavn, LagType } from '../MidlertidigData/Dimensjonering.ts';

type DimensionContextType = {
	handlers: {
		handleToggleCheckbox: (
			dimLagType: DimensjoneringsLagType,
			lagNavn: Pick<LagType, 'aktiv' | 'navn'>[]
		) => void;
		handleEndreTykkelse: (
			value: string,
			dimLagType: DimensjoneringsLagType,
			lagNavn: LagNavn[]
		) => void;
		handleEndreMateriale: (
			value: string,
			dimLagType: DimensjoneringsLagType,
			lagNavn: LagNavn[]
		) => void;
	};
};

export const DimensionContext = createContext<DimensionContextType>({
	handlers: {
		handleToggleCheckbox: () => undefined,
		handleEndreTykkelse: () => undefined,
		handleEndreMateriale: () => undefined,
	},
});
