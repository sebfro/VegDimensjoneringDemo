import { FC, useState } from 'react';
import styled, { css, ThemedStyledProps } from 'styled-components';
import Kort from '../../atoms/Kort';
import { BodyMediumTekst, LabelTekst } from '../../atoms/TekstKomponenter';
import { Colors } from '../../../styles/colors';
import SvgGetter from '../../atoms/SVG/SvgGetter/SvgGetter';
import UtvidKnapp from '../../atoms/Knapper/UtvidKanpp';

interface OpplastingDetaljerProps {
	tidspunkt: {
		ferdig?: string;
		totalTidsBruk: {
			timer: number;
			minutter: number;
		};
	};
	fylker: string[];
	opplastedeMapper: { navn: string; antallBilder: number }[];
}

const OpplastingDetaljer: FC<OpplastingDetaljerProps> = ({
	fylker,
	opplastedeMapper,
	tidspunkt,
}) => {
	const [visOpplastedeMapper, setVisOpplastedeMapper] = useState(false);
	const {
		totalTidsBruk: { timer, minutter },
		ferdig,
	} = tidspunkt;
	return (
		<StyledKort>
			<Rad
				styling={css`
					justify-content: space-between;
					margin-bottom: 1.5rem;
				`}
			>
				<TekstMedLabel>
					<LabelTekst>Opplasting ferdig</LabelTekst>
					<BodyMediumTekst>
						{ferdig
							? new Date(ferdig)
									.toLocaleDateString('no-nb', {
										day: '2-digit',
										month: '2-digit',
										year: 'numeric',
										hour: '2-digit',
										minute: '2-digit',
									})
									.replace(',', ' -')
							: '-'}
					</BodyMediumTekst>
				</TekstMedLabel>
				<BindeStrek icon={'IngenNyeBilder'} wrapSvg størrelse={'liten'} />
				<TekstMedLabel>
					<LabelTekst>Total tidsbruk</LabelTekst>
					<BodyMediumTekst>
						{timer} timer {minutter} minutter
					</BodyMediumTekst>
				</TekstMedLabel>
			</Rad>
			<Rad>
				<TekstMedLabel>
					<LabelTekst>Fylker</LabelTekst>
					<BodyMediumTekst>{fylker.join(', ')}</BodyMediumTekst>
				</TekstMedLabel>
			</Rad>
			{opplastedeMapper.length > 0 && (
				<>
					<Linje />
					<StyledUtvidKnapp
						onClick={() => setVisOpplastedeMapper(!visOpplastedeMapper)}
						erÅpen={visOpplastedeMapper}
						tekst={`Vis opplastede mapper (${opplastedeMapper.length})`}
						ikonFarge={Colors.oransje}
					/>
					{visOpplastedeMapper && (
						<OpplastedeBilder>
							{opplastedeMapper.map(({ navn, antallBilder }, index) => (
								<OpplastedeBilderRad
									borderBottom={index !== opplastedeMapper.length - 1}
									key={index}
								>
									<BodyMediumTekst>{navn}</BodyMediumTekst>
									<AntallBilder>{antallBilder} bilder</AntallBilder>
								</OpplastedeBilderRad>
							))}
						</OpplastedeBilder>
					)}
				</>
			)}
		</StyledKort>
	);
};

export default OpplastingDetaljer;

const StyledKort = styled(Kort)`
	padding: 2.5rem 2.5rem 2rem 2.5rem;
	border: none;
`;

const TekstMedLabel = styled.div`
	display: flex;
	flex-direction: column;
	row-gap: 0.5rem;
`;

const Rad = styled.div<{ styling?: ThemedStyledProps<any, any> }>`
	${({ styling }) => styling};
	display: flex;
`;

const BindeStrek = styled(SvgGetter)`
	align-self: flex-end;
`;

const Linje = styled.div`
	height: 1px;
	width: 100%;
	background-color: ${Colors.grå};
	margin-top: 2.5rem;
`;

const OpplastedeBilder = styled(Kort)`
	background-color: ${Colors.sort};
	border: none;
	padding: 0;
`;

const OpplastedeBilderRad = styled.div<{ borderBottom: boolean }>`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 1rem 1.5rem;
	${({ borderBottom }) =>
		borderBottom &&
		css`
			border-bottom: 1px solid ${Colors.grå};
		`};
`;

const StyledUtvidKnapp = styled(UtvidKnapp)`
	padding: 1rem 0;
	height: unset;
	margin: 0.5rem 0;
`;

const AntallBilder = styled(LabelTekst)`
	color: ${Colors.grå};
`;
