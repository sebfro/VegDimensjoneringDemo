import React, { FC, forwardRef, Ref } from 'react';
import { LagType } from '../../../lib/MidlertidigData/Dimensjonering';
import styled from 'styled-components';
import { BodyLitenTekst } from '../../atoms/TekstKomponenter.ts';
import { MaterialeBoks } from './MaterialeBoks.tsx';
import { LagBoks } from './LagBoks.tsx';
import { TykkelseBoks } from './TykkelseBoks.tsx';

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
				<TykkelseBoks
					lag={lag}
					index={index}
					borderTop={borderTop}
					handleEndreTykkelse={handleEndreTykkelse}
				/>
			);
		};
		const genererRader = () => {
			return lagListe.map((lag, index) => {
				const borderTop = index === 0;
				return (
					<Rad key={index} ref={ref as React.RefObject<HTMLDivElement>}>
						<LagBoks
							lag={lag}
							index={index}
							handleToggleCheckbox={handleToggleCheckbox}
							borderTop={borderTop}
						/>
						<MaterialeBoks
							borderTop={borderTop}
							lag={lag}
							index={index}
							handleEndreMateriale={handleEndreMateriale}
						/>
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
	max-height: 3rem;
	width: 100%;
	align-items: center;
	--border-style: 1px solid;
`;

const TittelRad = styled(Rad)`
	padding-bottom: 1rem;
`;

const KolonneTittel = styled(BodyLitenTekst)`
	padding-left: 1rem;
`;
