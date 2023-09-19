import styled from 'styled-components';
import { Colors } from '../../styles/colors';

export interface TabelData {
	kolonnenavn?: Array<any>;
	navn?: string;
	data?: Array<any>;
}

export interface TabellProps {
	data?: TabelData;
	backlink: string;
}

function Tabell(props: TabellProps) {
	const data = props.data;
	const tabelldata: Array<any> = data?.data ?? [];
	const kolonnenavn: Array<any> = data?.kolonnenavn ?? [];
	const overskrift = data?.navn ?? '[UKJENT_KODEVERKSTYPE]';

	const tabellKolonneNavn = kolonnenavn.map((kn: any) => <th key={kn}>{kn}</th>);
	const listItems = tabelldata.map((rad: any) => (
		<tr key={rad[kolonnenavn[0]]}>
			{kolonnenavn.map((kn, index) => (
				<td key={`${rad[kolonnenavn[0]]}.${index}`}>{`${rad[kn]}`}</td>
			))}
		</tr>
	));

	return (
		<Container>
			<h1>{overskrift}</h1>
			<StyledTable>
				<thead>
					<tr>{tabellKolonneNavn}</tr>
				</thead>
				<tbody>{listItems}</tbody>
			</StyledTable>

			<a href={props.backlink ?? '..'}>Tilbake til oversikt</a>
		</Container>
	);
}

export default Tabell;

const Container = styled.div`
	margin-left: 2rem;

	a {
		text-decoration: underline;

		:hover,
		:focus,
		:active {
			font-weight: bold;
		}
	}
`;

const StyledTable = styled.table`
	margin: 16px 0 16px;
	max-font-size: 100%;
	white-space: nowrap;

	th {
		display: table-cell;
		border: 1px solid black;
		text-align: left;
		padding: 10px;
		color: white;
		background: ${Colors.mørkSort};
	}

	td {
		display: table-cell;
		border: 1px solid black;
		padding: 10px;
	}

	tr:nth-child(even) {
		color: white;
		background: ${Colors.oransje};
	}
`;
