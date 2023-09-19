import { FC } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip } from 'recharts';
import { Colors } from '../../styles/colors';
import styled from 'styled-components';
import { LabelTekst } from '../atoms/TekstKomponenter';

interface AreaRechartProps {
	hastighet: number[];
}

type DataType = {
	name: number;
	'mb/s': number;
	pv: number;
	amt: number;
};

const AreaRechart: FC<AreaRechartProps> = ({ hastighet }) => {
	const nyesteData = hastighet[hastighet.length - 1] || 0;

	const dataHastighet = [0, 0, ...hastighet].map((hastighet, index) => {
		return {
			name: index,
			'mb/s': hastighet,
			pv: 2400,
			amt: 2400,
		} as DataType;
	});
	return (
		<Wrapper>
			<StyledResponsiveContainer width='100%' height={140}>
				<AreaChart
					width={730}
					height={250}
					data={dataHastighet.length > 10 ? dataHastighet.slice(-10) : dataHastighet || []}
					margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
				>
					<defs>
						<linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
							<stop offset='5%' stopColor='rgba(255, 150, 0, 0.15)' stopOpacity={0.8} />
							<stop offset='95%' stopColor='rgba(255, 150, 0, 0.15)' stopOpacity={0} />
						</linearGradient>
					</defs>
					<Tooltip />
					<Area
						animationDuration={0}
						type='bumpX'
						dataKey='mb/s'
						stroke={Colors.oransje}
						fillOpacity={1}
						strokeWidth={3}
						fill='url(#colorUv)'
					/>
				</AreaChart>
			</StyledResponsiveContainer>
			<Info>
				<LabelTekst>{nyesteData} MB/s</LabelTekst>
			</Info>
		</Wrapper>
	);
};

export default AreaRechart;

const StyledResponsiveContainer = styled(ResponsiveContainer)`
	margin-bottom: 1rem;
`;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
`;

const Info = styled.div`
	display: flex;
	justify-content: end;
	align-items: center;
`;
