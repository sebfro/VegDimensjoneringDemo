import { useCallback, useEffect, useReducer, useRef } from 'react';
import { useMutation } from '@tanstack/react-query';
import { OpplastingKontrollerService } from '../../api';
import { LokalVegBilde } from '../typer/OpplastingTyper.ts';

const logUploadedFile = (num: number, filNavn?: string) => {
	const msg = `%cUploaded ${num} files. Filnavn: ${filNavn || 'ukjent filnavn'}`;
	const style = 'color:green;font-weight:bold;';
	console.log(msg, style);
};

export type InitialStateType = {
	filer: LokalVegBilde[];
	venter: LokalVegBilde[];
	neste: null | LokalVegBilde;
	uploading: boolean;
	lastetOpp: LokalVegBilde[];
	status:
		| 'LAST_INN'
		| 'INIT'
		| 'VENTER'
		| 'FIL_LASTET_OPP'
		| 'ALLE_FILER_LASTET_OPP'
		| 'OPPLASTING_ERROR'
		| 'IDLE';
	error?: string;
	hastighet: number[];
};

enum ActionKind {
	LAST_INN = 'LAST_INN',
	SUBMIT = 'SUBMIT',
	NESTE = 'NESTE',
	FIL_LASTET_OPP = 'FIL_LASTET_OPP',
	ALLE_FILER_LASTET_OPP = 'ALLE_FILER_LASTET_OPP',
	OPPLASTING_ERROR = 'OPPLASTING_ERROR',
	IDLE = 'IDLE',
}

type ActionType = {
	type: ActionKind;
	filer?: LokalVegBilde[];
	prev?: LokalVegBilde;
	error?: string;
	neste?: LokalVegBilde;
	hastighet?: number;
};

// https://betterprogramming.pub/keep-your-users-constantly-occupied-ff8ba0b0e673
// Eksemplet er litt merkelig. Så det må justeres litt for at det skal fungere.
/**
 * Reducer for å håndtere opplasting av filer.
 * @param state {1}
 * @param action
 * @returns {InitialStateType}
 * @example
 * const [state, dispatch] = useReducer(reducer, initialState);
 */
const reducer = (state: InitialStateType, action: ActionType): InitialStateType => {
	const { type, prev, neste = null, filer = [] } = action;
	switch (type) {
		// TODO: bør legge til en case for gjennopta siden håndteringen blir annerledes enn ved første opplasting.
		case ActionKind.LAST_INN: {
			// Filtrer ut filer som allerede har blitt lastet opp.
			const lastetOpp = filer.filter((fil) => fil?.status === 'FERDIG');
			return {
				...state,
				filer: filer,
				lastetOpp,
				status: 'LAST_INN',
			};
		}
		case ActionKind.SUBMIT: {
			// Legg filer som ikke har blitt lastet opp i pending.
			const venter = state.filer.filter((fil) => fil?.status !== 'FERDIG');
			return {
				...state,
				uploading: true,
				venter,
				status: 'INIT',
			};
		}
		case ActionKind.NESTE:
			return { ...state, neste, status: 'VENTER' };
		case ActionKind.FIL_LASTET_OPP:
			return {
				...state,
				neste: null,
				lastetOpp: [...state.lastetOpp, prev || filer[0]],
				venter: state.venter.slice(1),
				hastighet: [...(state.hastighet || []), action.hastighet || 0],
				status: 'FIL_LASTET_OPP',
			};
		case ActionKind.ALLE_FILER_LASTET_OPP:
			return {
				...state,
				uploading: false,
				status: 'ALLE_FILER_LASTET_OPP',
			};
		case ActionKind.OPPLASTING_ERROR:
			return {
				...state,
				neste: null,
				status: 'OPPLASTING_ERROR',
				error: action.error,
				uploading: false,
			};
		case ActionKind.IDLE:
			return { ...state, status: 'IDLE' };
		default:
			return state;
	}
};

export type UseLastOppVegbilderType = {
	lastOppFiler: () => void;
	leggTilFiler: (filer: LokalVegBilde[]) => void;
	fileHandlerState: InitialStateType;
};
/**
 * Hook for å håndtere opplasting av filer.
 * @returns {UseLastOppVegbilderType}
 * @example
 * const { lastOppFiler, leggTilFiler, fileHandlerState } = useLastOppVegbilder();
 */
const useLastOppVegbilder = (): UseLastOppVegbilderType => {
	const initialState: InitialStateType = {
		filer: [],
		venter: [],
		neste: null,
		uploading: false,
		lastetOpp: [],
		status: 'IDLE',
		hastighet: [],
	};
	const [state, dispatch] = useReducer(reducer, initialState);
	const countRef = useRef(0);

	const lastOppVegbildeMutation = useMutation(OpplastingKontrollerService.lastOpp, {
		onSuccess: (data) => {
			return data;
		},
		onError: (error) => {
			return error;
		},
	});

	//Setter den neste filen når den registerer at den er klar
	useEffect(() => {
		if (state.venter && state.neste === null && state.uploading) {
			const neste = state.venter[0];
			dispatch({ type: ActionKind.NESTE, neste });
		}
	}, [state.neste, state.uploading, state.venter]);

	//Last opp den neste filen når den registerer at den er klar
	useEffect(() => {
		if (state.venter.length && state.neste && state.status !== 'OPPLASTING_ERROR') {
			const { neste } = state;
			const start = Date.now();
			const fil = neste.fil;
			if (fil && neste.id) {
				OpplastingKontrollerService.lastOpp({ id: neste.id, formData: { file: fil } })
					.then(() => {
						const prev = neste;
						logUploadedFile(++countRef.current, neste.navn);
						const opplastingTidISekunder = (Date.now() - start) / 1000;
						const hastighet = (prev?.fil?.size || 0) / 1000000 / opplastingTidISekunder;
						dispatch({ type: ActionKind.FIL_LASTET_OPP, prev, hastighet: +hastighet.toFixed(1) });
					})
					.catch((error) => {
						console.log(error);
						dispatch({ type: ActionKind.OPPLASTING_ERROR, error });
					});
			}
		}
	}, [lastOppVegbildeMutation, state]);

	// Avslutt opplasting når det ikke er flere filer i venter.
	useEffect(() => {
		if (!state.venter.length && state.uploading) {
			dispatch({ type: ActionKind.ALLE_FILER_LASTET_OPP });
		}
	}, [state.venter.length, state.uploading]);

	const leggTilFiler = (filer: LokalVegBilde[]) => {
		if (filer && filer.length > 0) {
			dispatch({
				type: ActionKind.LAST_INN,
				filer,
			});
		}
	};

	const lastOppFiler = useCallback(() => {
		dispatch({ type: ActionKind.SUBMIT });
	}, []);

	return {
		lastOppFiler,
		leggTilFiler,
		fileHandlerState: state,
	};
};

export default useLastOppVegbilder;
