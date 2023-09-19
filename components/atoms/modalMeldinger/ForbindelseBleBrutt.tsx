import { FC, useEffect } from 'react';
import { BaseModalProps, Modal } from '../Modal';
import styled from 'styled-components';
import ProgresjonBar from '../ProgresjonBar';
import { FilerType } from '../../../lib/typer/OpplastingTyper';
import { Colors } from '../../../styles/colors';
import { TextStyles } from '../../../styles/TextStyles';
import useSjekkOmOnline from '../../../lib/hooks/useSjekkOmOnline.ts';

interface FeilIVegbildeSystemetProps extends BaseModalProps {
	filer: FilerType;
}

const FeilIVegbildeSystemet: FC<FeilIVegbildeSystemetProps> = ({
	filer: { antall, opplastet },
	erÅpen,
	setErÅpen,
	...props
}) => {
	// Sjekk om bruker er online
	const erOnline = useSjekkOmOnline();
	const userActivation = navigator.userActivation.hasBeenActive;
	useEffect(() => {
		if (!userActivation) {
			setErÅpen(true);
		}
	}, [erOnline, setErÅpen, userActivation]);

	return (
		<Modal
			tekster={{
				tittel: 'Forbindelsen ble brutt',
				beskrivelse:
					'Forbindelsen ble brutt under opplastingen. Du kan fortsette opplastingen der vi slapp ved å gjenoppta opplastning.',
				lukke: 'Avbryt og avslutt',
				bekreft: 'Gjennoppta opplasting',
			}}
			{...props}
			setErÅpen={setErÅpen}
			erÅpen={erÅpen}
		>
			<Progresjon>
				<Tittel>Progresjon (vegbilder lastet opp)</Tittel>
				<Antall>
					{antall}
					<GråTekst> / {Math.round(opplastet)}</GråTekst>
				</Antall>
				<div>
					<StyledProgresjonBar filer={{ antall, opplastet }} status={'laster opp'} />
				</div>
				<p>{JSON.stringify(navigator.userActivation.hasBeenActive)}</p>
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
