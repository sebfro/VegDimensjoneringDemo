import styled from 'styled-components';
import { Container } from '../styles/BasePageLayout';
import { TittelLitenTekst, TittelStorTekst } from '../components/atoms/TekstKomponenter.ts';
import { KnappeFooter } from '../components/atoms/Knapper/KnappeFooter.tsx';
import { useNavigate } from 'react-router-dom';
import { Urls } from '../lib/Urls.ts';
import { AkselKonfigurasjon } from '../components/domain/DimensjoneringsGrunnlag/AkselKonfigurasjon.tsx';
import { TrafikkData } from '../components/domain/DimensjoneringsGrunnlag/TrafikkData.tsx';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { Kjørefelt } from '../components/domain/DimensjoneringsGrunnlag/Kjørefelt.tsx';
import { TrafficGroupCalculator } from '../lib/Utils/TrafficGroupCalculator.ts';
import { Posisjon } from '../components/domain/DimensjoneringsGrunnlag/Posisjon.tsx';

export type KjørefeltType = 1 | 2 | 3 | 4;

export interface IFormInputs {
	fartsgrense?: number;
	andeltunge?: number;
	trafikkvekst?: number;
	PiggdekkDager?: number;
	Piggdekkandel?: number;
	saltingAvVegen?: 'Ja' | 'Nei';
	kjørefelt?: KjørefeltType;
	ådt?: number;
}

export const defaultValues: IFormInputs = {
	saltingAvVegen: 'Ja',
};

export const Grunnlag = () => {
	const navigation = useNavigate();
	const methods = useForm<IFormInputs>({
		defaultValues,
	});
	const kalk = new TrafficGroupCalculator({});
	const onSubmit: SubmitHandler<IFormInputs> = (data) => {
		kalk.UpdateValues(data);
		kalk.calculateTrafficGroup();
		console.log(kalk.trafficGroup);
	};

	methods.watch((data: IFormInputs) => {
		kalk.UpdateValues(data);
		kalk.calculateTrafficGroup();
	});

	return (
		<>
			<FormProvider {...methods}>
				<form onSubmit={methods.handleSubmit(onSubmit)}>
					<StyledContainer>
						<Header>
							<TittelStorTekst>Dimensjoneringsgrunnlag</TittelStorTekst>
						</Header>
						<HøyreKolonne>
							<TraffikdataTittel>Trafikkdata</TraffikdataTittel>
							<TrafikkData />
							<AkselKonfigurasjon />
							<Kjørefelt />
						</HøyreKolonne>
						<Posisjon />
					</StyledContainer>
					<KnappeFooter
						kanppProps={{
							avbrytOnClick: () => navigation(Urls.posisjon),
							bekreftOnClick: () => navigation(Urls.dimensjonering),
						}}
					/>
				</form>
			</FormProvider>
		</>
	);
};

const StyledContainer = styled(Container)`
	display: grid;
	align-items: start;
	grid-template-columns: 2fr 1fr;
	grid-template-rows: 5rem auto;
	padding-top: 4rem;
	grid-column-gap: 4rem;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	grid-column: 1 / span 2;
`;

const HøyreKolonne = styled.div``;

const TraffikdataTittel = styled(TittelLitenTekst)`
	margin: 4rem 0 1.5rem;
`;
