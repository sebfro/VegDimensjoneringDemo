import { IFormInputs, KjørefeltType } from '../../routes/Grunnlag.tsx';

type FordelingsFaktor = 1 | 0.5 | 0.45 | 0.4;
export type TrafficGroup = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';

const TrafficGroup: { group: TrafficGroup; threshold: number }[] = [
	{ group: 'A', threshold: 500000 },
	{ group: 'B', threshold: 1000000 },
	{ group: 'C', threshold: 2000000 },
	{ group: 'D', threshold: 3500000 },
	{ group: 'E', threshold: 10000000 },
	{ group: 'F', threshold: 10000000 },
];

const FordelingsfaktorMap = new Map<KjørefeltType, FordelingsFaktor>([
	[1, 1],
	[2, 0.5],
	[3, 0.45],
	[4, 0.4],
]);

/**
 * Calculates the traffic group based on the provided params <br/>
 * @param ådt {number} gjennomsnittlig antall tunge kjøretøy pr. døgn <br/>
 * @param f {FordelingsFaktor} fordelingsfaktor er basert på antall felt veien har. 1 felt = 1, 2 felt = 0.5, 3 felt = 0.45, 4 felt = 0.4. (Settes normalt til 0.5) <br/>
 * @param p {number} Årlig trafikkvekst for tunge kjøretøy i prosent. <br/>
 * @param c {number} Gjennomsnittlig antall aksler pr. tungt kjøretøy (normalt settes C=2.4) <br/>
 * @param e {number} Gjennomsnittlig ekvivalentsfaktor for akslene på tunge kjøretøy ( I norge settes normalt E=0.427 ved tillatt aksellast 10 tonn) <br/>
 */
export class TrafficGroupCalculator {
	private ådt: number | undefined;
	private andelTunge: number | undefined;
	private f: FordelingsFaktor | undefined;
	private p: number | undefined;
	private c: number;
	private e: number;
	public n: number | undefined;
	public trafficGroup: TrafficGroup | undefined;

	constructor(params: {
		ådt?: number;
		andelTunge?: number;
		f?: KjørefeltType;
		p?: number;
		c?: number;
		e?: number;
	}) {
		this.ådt = params?.ådt;
		this.andelTunge = params?.andelTunge ? params.andelTunge / 100 : undefined;
		this.setFordelingsfaktor(params?.f);
		this.p = params?.p;
		this.c = params?.c ?? 2.4;
		this.e = params?.e ?? 0.427;
		this.calculateTrafficGroup();
	}

	public UpdateValues = (params: IFormInputs) => {
		this.ådt = params?.ådt;
		this.andelTunge = params?.andeltunge ? params.andeltunge / 100 : undefined;
		this.setFordelingsfaktor(params?.kjørefelt);
		this.p = params?.trafikkvekst;
		this.c = 2.4;
		this.e = 0.427;
		this.calculateTrafficGroup();
	};

	private setFordelingsfaktor = (numberOfLanes?: KjørefeltType) => {
		this.f = numberOfLanes ? FordelingsfaktorMap.get(numberOfLanes) : undefined;
	};

	public calculateTrafficGroup = () => {
		if (!this.ådt || !this.f || !this.p || !this.andelTunge) return;
		const antallTungeKjøretøy = this.ådt * this.andelTunge;
		const n =
			365 *
			this.c *
			this.e *
			antallTungeKjøretøy *
			this.f *
			((Math.pow(1 + 0.01 * this.p, 20) - 1) / (0.01 * this.p));
		const group = TrafficGroup.find(({ group, threshold }) => {
			if (group === 'F') {
				return group;
			}
			if (n <= threshold) {
				return group;
			}
		})?.group;
		this.n = n;
		this.trafficGroup = group;
	};
}
