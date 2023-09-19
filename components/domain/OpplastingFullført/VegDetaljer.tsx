import { FC } from 'react';
import styled, { css } from 'styled-components';
import Kort from '../../atoms/Kort';
import { Colors } from '../../../styles/colors';
import { TextStyles } from '../../../styles/TextStyles.ts';
import { formatBytesToGB } from '../../../lib/Utils/formatHelpers.ts';

interface VegDetaljerProps {
	opplasting: {
		bilder?: number;
		veger?: number;
		dataMengde?: number;
	};
}

const VegDetaljer: FC<VegDetaljerProps> = ({ opplasting: { bilder, veger, dataMengde } }) => {
	const { dataMengde: konvertertDataMengde, dataType } = formatBytesToGB(dataMengde || 0);
	return (
		<StyledKort>
			<VegDetaljerKolonne>
				<Tall>{bilder}</Tall>
				<Label>Vegbilder</Label>
			</VegDetaljerKolonne>
			<Linje />
			<VegDetaljerKolonne>
				<Tall>{veger}</Tall>
				<Label>veger</Label>
			</VegDetaljerKolonne>
			<Linje />
			<VegDetaljerKolonne>
				<Tall>
					{konvertertDataMengde} {dataType}
				</Tall>
			</VegDetaljerKolonne>
		</StyledKort>
	);
};

export default VegDetaljer;

const StyledKort = styled(Kort)`
	border: none;
	display: grid;
	grid-template-columns: 1fr 3rem 1fr 3rem 1fr;
	padding: 2.5rem;
	margin-bottom: 2.5rem;
`;

const VegDetaljerKolonne = styled.div<{ border?: boolean }>`
	${({ border = false }) =>
		border &&
		css`
			border-right: 1px solid ${Colors.hvit};
			border-left: 1px solid ${Colors.hvit};
		`};
	display: flex;
	flex-direction: column;
	row-gap: 0.5rem;
	justify-content: center;
	align-items: center;
`;

const Linje = styled.div`
	height: 100%;
	width: 1px;
	background-color: ${Colors.hvit};
	justify-self: center;
`;

const Label = styled.p`
	${TextStyles.LabelType};
`;

const Tall = styled.p`
	${TextStyles.BodyStor};
`;
