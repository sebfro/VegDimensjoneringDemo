import React, { FC, forwardRef, Ref, useEffect, useRef } from 'react';
import { DimensjoneringsLagType, LagType } from '../../../lib/MidlertidigData/Dimensjonering';
import styled from 'styled-components';
import { BodyLitenTekst } from '../../atoms/TekstKomponenter.ts';
import { MaterialeBoks } from './MaterialeBoks.tsx';
import { LagBoks } from './LagBoks/LagBoks.tsx';
import { TykkelseBoks } from './TykkelseBoks.tsx';
import { DoubleRow } from './LagBoks/DoubleRow.tsx';

interface BæreEvneProps {
	dimLagMap: Map<DimensjoneringsLagType, LagType[]>;
}

const BæreEvne: FC<BæreEvneProps> = forwardRef<Ref<HTMLDivElement>, BæreEvneProps>(
	({ dimLagMap }, ref) => {
		const containerref = useRef<HTMLDivElement>(null);

		useEffect(() => {
			if (containerref.current) {
				console.log(containerref.current.offsetHeight);
			}
		}, [containerref]);
		const genererRader = () => {
			const rader: React.ReactElement[] = [];
			let borderTopLagtTil = true;
			dimLagMap.forEach((lagListe, dimLagType) => {
				if (lagListe.length === 1) {
					const lag = lagListe[0];
					rader.push(
						<Rad ref={ref as React.RefObject<HTMLDivElement>}>
							<LagBoks dimLagType={dimLagType} lag={lag} borderTop={borderTopLagtTil} />
							<MaterialeBoks lag={lag} dimLagType={dimLagType} borderTop={borderTopLagtTil} />
							<TykkelseBoks lag={lag} dimLagType={dimLagType} borderTop={borderTopLagtTil} />
						</Rad>
					);
					borderTopLagtTil = false;
				} else {
					rader.push(<DoubleRow lag={lagListe} dimensjoneringsLagType={dimLagType} />);
				}
			});
			return rader;
		};
		return (
			<Container ref={containerref}>
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
	grid-template-rows: repeat(auto-fit, auto);
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
