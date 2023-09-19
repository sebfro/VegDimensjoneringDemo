import { FC } from 'react';
import { BaseModalProps, Modal } from '../Modal';
import styled from 'styled-components';
import ProgresjonBar from '../ProgresjonBar';
import { FilerType } from '../../../lib/typer/OpplastingTyper';
import { Colors } from '../../../styles/colors';
import { TextStyles } from '../../../styles/TextStyles';

interface FeilIVegbildeSystemetProps extends BaseModalProps {
	filer: FilerType;
}

const FeilIVegbildeSystemet: FC<FeilIVegbildeSystemetProps> = ({
	filer: { antall, opplastet },
	...props
}) => {
	return (
		<Modal
			tekster={{
				tittel: 'Feil i vegbildersystemene',
				beskrivelse:
					'Et problem oppsto i baksystemene til vegbilder. Du kan fortsette opplastingen der vi slapp ved å gjenoppta opplasting. Om problemet vedvarer ',
				lukke: 'Avbryt og avslutt',
				bekreft: 'Gjennoppta opplasting',
			}}
			{...props}
		>
			<Progresjon>
				<Tittel>Progresjon (vegbilder lastet opp)</Tittel>
				<Antall>
					{opplastet}
					<GråTekst> / {Math.round(antall)}</GråTekst>
				</Antall>
				<div>
					<StyledProgresjonBar filer={{ antall, opplastet }} status={'laster opp'} />
				</div>
			</Progresjon>
		</Modal>
	);
};

export default FeilIVegbildeSystemet;

const Progresjon = styled.div`
	//display: flex;
`;

const Tittel = styled.h3`
	${TextStyles.BodyLiten};
	margin-bottom: 1rem;
`;

const Antall = styled.p`
	${TextStyles.TittelStor};
	margin-bottom: 1.5rem;
`;
const GråTekst = styled.span`
	color: ${Colors.grå};
`;

const StyledProgresjonBar = styled(ProgresjonBar)`
	margin-bottom: 3rem;
`;
