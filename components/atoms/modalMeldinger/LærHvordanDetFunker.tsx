import { FC } from 'react';
import { BaseModalProps, KnappeRad, Modal } from '../Modal';
import styled, { css, CSSProperties } from 'styled-components';
import Kort from '../Kort.tsx';
import { Colors } from '../../../styles/colors.ts';
import { BodyLitenTekst, TittelLitenTekst } from '../TekstKomponenter.ts';
import SvgGetter from '../SVG/SvgGetter/SvgGetter.tsx';

interface AvbrytOpplastingProps extends BaseModalProps {
	error?: boolean;
}

const LærHvordanDetFunker: FC<AvbrytOpplastingProps> = (props) => {
	const HovedMapper = ['Skrivebord', 'Harddisk (D:)', 'Dokumenter'];
	const BildeMapper = [
		'FV0001',
		'Sydentur 2023',
		'FV0002',
		'Sydentur 2022',
		'FV0003',
		'Sydentur 2021',
	];
	return (
		<StyledModal
			tekster={{
				tittel: 'Lær hvordand det funker',
				beskrivelse:
					'Det er egentlig ikke noe hokus pokus. Du velger område som inneholder vegbildene, så fikser vi resten.',
				bekreft: 'Velg mappe og last opp bilder',
				lukke: 'Lukk vindu',
			}}
			{...props}
		>
			<StyledKort color={Colors.grå}>
				<KortInnhold>
					<EksempelTittel>Eksempel</EksempelTittel>
					<Beskrivelse>
						Om vi velger “Harddisk (D:)” vil alle nye vegbilder fra FV0001, FV00002 og FV0003 bli
						lastet opp. Sydentur 2023 og de andre feriebildemappene vil bli utelatt da mappene ikke
						inneholder noen vegbilder.
					</Beskrivelse>
					<Filsystem>
						<Mapper>
							{HovedMapper.map((mappe, i) => (
								<MappeTekst color={i === 1 ? Colors.lysBlå : undefined} key={i}>
									{mappe}
								</MappeTekst>
							))}
						</Mapper>
						<MapperInnhold>
							{BildeMapper.map((mappe, i) => (
								<MappeWrapper key={i}>
									<SvgGetter icon={'Mappe'} størrelse='medium' wrapSvg />
									<MappeTekst>{mappe}</MappeTekst>
								</MappeWrapper>
							))}
						</MapperInnhold>
					</Filsystem>
				</KortInnhold>
			</StyledKort>
		</StyledModal>
	);
};

export default LærHvordanDetFunker;

const StyledModal = styled(Modal)<{ error?: boolean }>`
	${KnappeRad} {
		${({ error = false }) =>
			error
				? css`
						margin-top: 1.5rem;
				  `
				: css`
						margin-top: 3rem;
				  `};
	}
`;

const StyledKort = styled(Kort)`
	background-color: ${Colors.sort};
	border: none;
	padding: 1.5rem 2.5rem 2.5rem;
`;

const KortInnhold = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
`;

const EksempelTittel = styled(TittelLitenTekst)`
	margin-bottom: 0.5rem;
`;

const Beskrivelse = styled(BodyLitenTekst)`
	margin-bottom: 1.5rem;
`;

const Filsystem = styled(Kort)`
	background-color: ${Colors.sort};
	display: grid;
	grid-template-columns: 1fr 2.5fr;
	padding: 0;
	border-radius: 1rem;
	border: 1px solid ${Colors.grå};
`;

const Mapper = styled.div`
	display: flex;
	flex-direction: column;
	border-right: 1px solid ${Colors.grå};

	* {
		padding-left: 1.5rem;
	}
`;

const MapperInnhold = styled.div`
	display: grid;
	grid-template-columns: 1fr 1.2fr;
	padding: 0 1.5rem 0 1.5rem;
`;

const MappeBase = css`
	height: 40px;
	display: flex;
	align-items: center;
	gap: 0.5rem;
`;

const MappeTekst = styled(BodyLitenTekst)<{ color?: CSSProperties['color'] }>`
	${({ color }) =>
		color &&
		css`
			background-color: ${color};
		`};
	${MappeBase};
`;

const MappeWrapper = styled.div`
	${MappeBase};
`;
