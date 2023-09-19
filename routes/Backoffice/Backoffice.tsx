import { FC } from 'react';
import { Container } from '../../styles/BasePageLayout';
import { TittelStorTekst } from '../../components/atoms/TekstKomponenter';
import styled from 'styled-components';
import { Urls } from '../../lib/Urls.ts';

const Backoffice: FC = () => {
	return (
		<StyledContainer>
			<TittelStorTekst>Backoffice</TittelStorTekst>
			<a href={Urls.index}>Gå hovedsiden</a>
			<a href={Urls.oversikt}>Gå til oversikt</a>
			<a href={Urls.opplasting}>Gå til opplating</a>
			<a href={Urls.playground}>Gå til playground</a>
			<a href={Urls.fullført}>Gå til fullført</a>
			<a href={Urls.backoffice.kodeverk}>Gå til kodeverk</a>
		</StyledContainer>
	);
};

export default Backoffice;

const StyledContainer = styled(Container)`
	a:hover {
		font-size: 1.5rem;
	}

	row-gap: 1rem;
`;
