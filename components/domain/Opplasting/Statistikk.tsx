import { FC, useCallback } from 'react';
import styled, { CSSProperties } from 'styled-components';
import { formatBytesToGB } from '../../../lib/Utils/formatHelpers';
import AreaRechart from '../../Eksperimenter/AreaRechart';
import { TextStyles } from '../../../styles/TextStyles';
import { Colors } from '../../../styles/colors';
import { InitialStateType } from '../../../lib/hooks/useLastOppVegbilder.ts';
import { LokalBildeMappe } from '../../../lib/typer/OpplastingTyper.ts';

interface StatistikkProps {
	hastighet: number[];
	fileHandlerState: InitialStateType;
	bildeMapper: LokalBildeMappe[];
}

const Statistikk: FC<StatistikkProps> = ({ hastighet, fileHandlerState, bildeMapper }) => {
	const hentTellere = (
		antall: number,
		opplastet: number,
		type: 'vegbilder' | 'GB' | 'MB' | 'mapper'
	) => (
		<>
			<Teller gridColumn={1}>
				<span>{opplastet}</span> / {antall} {type}
			</Teller>
		</>
	);
	const tellAntall = useCallback(() => {
		let totalAntallVegbilder = 0;
		let data = 0;
		let antallOpplastedeMapper = 0;
		bildeMapper.forEach((mappe) => {
			const vegbilder = mappe.vegBilder;
			const opplastedeBilder = fileHandlerState.lastetOpp.filter(
				(obj) => obj.bildeMappeId === mappe.id
			);
			if (vegbilder) {
				let opplastedeVegbilder = 0;
				totalAntallVegbilder += vegbilder.length;
				vegbilder.forEach((bilde) => {
					const index = opplastedeBilder.findIndex(({ id }) => id === bilde.id);
					if (index > -1) opplastedeVegbilder++;
					if (bilde?.fil?.size) {
						data += bilde.fil.size;
					}
				});
				if (opplastedeVegbilder === vegbilder.length) antallOpplastedeMapper++;
			}
		});
		return { totalAntallVegbilder, data, antallOpplastedeMapper };
	}, [bildeMapper, fileHandlerState.lastetOpp]);

	const lastetOpp = fileHandlerState.lastetOpp.reduce((acc, fil) => acc + (fil?.fil?.size || 0), 0);

	const { totalAntallVegbilder, data, antallOpplastedeMapper } = tellAntall();
	const totalData = formatBytesToGB(data);
	const lastetOppData = formatBytesToGB(lastetOpp, totalData.dataType);
	return (
		<Statistiker>
			{hentTellere(totalAntallVegbilder, fileHandlerState.lastetOpp.length, 'vegbilder')}
			<Teller gridColumn={1}>
				<span>{}</span>
			</Teller>
			{hentTellere(+totalData.dataMengde, +lastetOppData.dataMengde, totalData.dataType)}
			{hentTellere(bildeMapper.length, antallOpplastedeMapper, 'mapper')}
			<NettHastighet>
				<AreaRechart hastighet={hastighet} />
			</NettHastighet>
		</Statistiker>
	);
};

export default Statistikk;

const Statistiker = styled.div`
	display: grid;
	grid-template-columns: 25rem auto;
	row-gap: 0.5rem;
`;

const Teller = styled.pre<{ gridColumn: CSSProperties['gridColumn'] }>`
	grid-column: ${({ gridColumn }) => gridColumn};
	${TextStyles.Nummer};
	color: ${Colors.grå};

	span {
		color: ${Colors.hvit};
	}
`;

const NettHastighet = styled.div`
	grid-column: 2;
	grid-row: 2 / 5;
`;
