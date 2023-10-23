import { TittelLitenTekst } from '../../atoms/TekstKomponenter';
import KnappKort from '../../atoms/Knapper/KnappKort';
import styled from 'styled-components';
import { MessageWithLink } from '../../atoms/Messages/MessageWithLink.tsx';
import { Controller, useFormContext } from 'react-hook-form';
import { IFormInputs, KjørefeltType } from '../../../routes/Grunnlag.tsx';
import { useCallback, useState } from 'react';
import { TrafficGroup, TrafficGroupCalculator } from '../../../lib/Utils/TrafficGroupCalculator.ts';

export const Kjørefelt = () => {
	const methods = useFormContext<IFormInputs>();
	const trafficGroupCalculator = new TrafficGroupCalculator({});
	const [trafficGroup, setTrafficGroup] = useState<TrafficGroup | undefined>();

	const getKnappKort = useCallback(
		(felt: KjørefeltType) => (
			<Controller
				render={({ field }) => (
					<KnappKort
						kjørefelt={felt}
						selected={methods.getValues('kjørefelt') === felt}
						onClick={() => methods.setValue('kjørefelt', felt)}
						title={`${felt}-felt`}
						{...field}
					/>
				)}
				name='kjørefelt'
			/>
		),
		[methods]
	);
	const feltlist: KjørefeltType[] = [1, 2, 3, 4];

	methods.watch((data: IFormInputs) => {
		trafficGroupCalculator.UpdateValues(data);
		setTrafficGroup(trafficGroupCalculator.trafficGroup);
	});

	return (
		<>
			<TittelLitenTekst>Antall kjørefelt</TittelLitenTekst>
			<KnappeKortContainer>{feltlist.map(getKnappKort)}</KnappeKortContainer>
			<MessageWithLink
				url={'google.com'}
				text={{
					url: 'N100: Se Tabell 3.3—3 — Oppsummering av standardkrav for ulike dimensjoneringsklasser',
					heading: 'Kjørefeltbredde',
					description: {
						text: '3.25 meter per kjørefelt',
						reference: 'Hentes fra dimensjoneringsklasse',
					},
					requirement: 'Krav 3.3—1',
				}}
			/>
			{trafficGroup && (
				<MessageWithLink
					url={'google.com'}
					text={{
						url: 'Tabell 3.1.2—1 — Valg av trafikkgruppe ut fra antall ekvivalente 10 tonns aksler',
						heading: 'Trafikkgruppe',
						description: {
							text: `Trafikkgruppe ${trafficGroup}`,
							reference: 'Bestemmes av N',
						},
						requirement: 'Krav 3.3—1',
					}}
				/>
			)}
		</>
	);
};

const KnappeKortContainer = styled.div`
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	column-gap: 1.5rem;
	margin-top: 1.5rem;
`;
