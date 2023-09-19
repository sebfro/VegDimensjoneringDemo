import React from 'react';
import styled from 'styled-components';
import FocusOutline from '../StyledComponents/FocusOutline';
import { Colors } from '../../../styles/colors';
import SvgGetter from '../SVG/SvgGetter/SvgGetter';
import Kort from '../Kort';
import { Icons } from '../SVG/SvgGetter/Icons';
import { BodyLitenTekst } from '../TekstKomponenter.ts';

type Category = { id: string; description: string };
export const categories: Category[] = [
	{ id: '22', description: 'Sideareal' },
	{ id: '32', description: 'Eksisterende rekkverk' },
	{ id: '44', description: 'Vegbanen' },
	{ id: '42', description: 'Kryss, avkjørsel og rundkjøring' },
	{ id: '48', description: 'Gang og sykkelveg' },
	{ id: '54', description: 'Annet sted' },
];

export const categoryCardIconsList: Icons[] = [
	'Advarsel',
	'Informasjon',
	'IngenNyeBilder',
	'StatusLoader',
];

export type CategoryCardIcons = (typeof categoryCardIconsList)[number];

interface NavigasjonsKortProps {
	icon: CategoryCardIcons;
	title: string;
	height?: number;
}

const KnappKort: React.FC<NavigasjonsKortProps> = ({ icon, title, height }) => {
	return (
		<FocusOutline offset={10} height={'100%'}>
			<StyledCard height={height} tabIndex={0}>
				<Sirkel />
				<Content>
					<StyledSvgGetter icon={icon} wrapSvg />
					<BodyLitenTekst>{title}</BodyLitenTekst>
				</Content>
			</StyledCard>
		</FocusOutline>
	);
};

export default KnappKort;

const Sirkel = styled.div`
	border-radius: 50%;
	border: 2px solid ${Colors.primaryTekst};
	width: 2rem;
	height: 2rem;
	position: absolute;
	top: 1rem;
	right: 1rem;
`;

const StyledCard = styled(Kort)<{ height?: number }>`
	border: 1px solid ${Colors.grå};
	padding: 1rem;
	background-color: white;
	border-radius: 0;
	height: 10.25rem;
	width: 10.25rem;
	display: flex;
	justify-content: center;
	align-items: center;
	:focus {
		box-shadow: 0 0 16px 12px rgba(53, 62, 67, 0.08);
		border: 3px solid ${Colors.primaryTekst};
		border-radius: 2px;
		padding: 29px;
	}

	:hover {
		box-shadow: 0 0 8px 4px rgba(53, 62, 67, 0.3);
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	column-gap: 1.5em;
`;

const StyledSvgGetter = styled(SvgGetter)`
	height: 4rem;
	width: 4rem;
`;
