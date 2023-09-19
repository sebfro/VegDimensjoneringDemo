import { FC } from 'react';
import { BaseModalProps, Modal } from '../Modal';
import styled from 'styled-components';
import { TextStyles } from '../../../styles/TextStyles';
import Kort from '../Kort';
import { Colors } from '../../../styles/colors.ts';
import { BodyStorTekst, LabelTekst } from '../TekstKomponenter.ts';

export interface InneholderEksisterendeBilderProps extends BaseModalProps {
	filer: {
		totalt: number;
		eksisterendeBilder: number;
		nye: number;
	};
}

const InneholderEksisterendeBilder: FC<InneholderEksisterendeBilderProps> = ({
	filer,
	...props
}) => {
	return (
		<Modal
			tekster={{
				tittel: 'Noen mapper inneholder eksisterende bilder',
				beskrivelse:
					'Vi hopper automatisk over bildene som finnes fra før og laster kun opp nye vegbilder.',
				lukke: 'Avbryt',
				bekreft: 'Start opplasting av nye bilder',
			}}
			{...props}
		>
			<Innhold>
				<StyledKort>
					<Teller border={false}>
						<LabelTekst>Bilder totalt</LabelTekst>
						<BodyStorTekst>{filer.totalt}</BodyStorTekst>
					</Teller>
					<Linje />
					<Teller>
						<Tittel>Finner fra før</Tittel>
						<Antall>{filer.eksisterendeBilder}</Antall>
					</Teller>
					<Linje />
					<Teller>
						<Tittel>Nye bilder</Tittel>
						<Antall>{filer.nye}</Antall>
					</Teller>
				</StyledKort>
			</Innhold>
		</Modal>
	);
};

export default InneholderEksisterendeBilder;

const Innhold = styled.div``;

const Tittel = styled.h3`
	${TextStyles.BodyLiten};
	height: 1.5rem;
`;

const StyledKort = styled(Kort)`
	margin-bottom: 3rem;
	border: none;
	background-color: ${Colors.sort};
	border-radius: 1.5rem;
	display: grid;
	grid-template-columns: 1fr 1px 1fr 1px 1fr;
	column-gap: 1.5rem;
	//justify-content: space-between;
	padding: 1.5rem 2.5rem;
`;

const Teller = styled.div<{ border?: boolean }>`
	display: grid;
	column-gap: 0.5rem;
	color: ${Colors.hvit};
`;

const Antall = styled.div`
	${TextStyles.TittelMedium};
	height: 2.5rem;
`;

const Linje = styled.div`
	height: 100%;
	width: 100%;
	background-color: ${Colors.hvit};
`;
