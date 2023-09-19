import { IndexDBHandler } from './IndexDBHandler.ts';

const dbNavn = 'VegbildeOpplasting';
const storeNavn = 'FileHandler';
/**
 * Henter en FileHandler fra IndexDB hvis den finnes.
 * Hvis den finnes så sjekkes det om den har tilgang til filsystemet.
 * Hvis den ikke har tilgang så spørres det om tilgang.
 * @param lobbyId
 * @constructor
 */
export const hentFileHandlerForLobby = async (
	lobbyId: string
): Promise<FileSystemDirectoryHandle | undefined> => {
	// Hvis userActivation.hasBeenActive er true så er det en brukerinteraksjon som har skjedd.
	// Da kan vi spørre om tilgang til filsystemet.
	if (navigator.userActivation.hasBeenActive) {
		const indexDBHandler = new IndexDBHandler(dbNavn, storeNavn);
		await indexDBHandler.open();
		const directoryHandle = await indexDBHandler.get(lobbyId);
		await indexDBHandler.close();
		const handler = directoryHandle?.handler;
		if (handler) {
			const per = await handler.queryPermission({ mode: 'read' });
			if (per === 'prompt' || per === 'denied') {
				const resultat = await handler.requestPermission({ mode: 'read' });
				if (resultat === 'granted') {
					return handler;
				}
			} else {
				return handler;
			}
		}
	}
	return undefined;
};

/**
 * Legger en FileHandler til IndexDB. Hvis det ikke eksisterer en FileHandler for lobbyId så legges den til.
 * @param lobbyId
 * @param handler
 */
export const leggFileHandlerTilIndexDB = async (
	lobbyId: string,
	handler: FileSystemDirectoryHandle
) => {
	const indexDBHandler = new IndexDBHandler(dbNavn, storeNavn);
	await indexDBHandler.open();
	const directoryHandle = await indexDBHandler.get(lobbyId);
	if (!directoryHandle) {
		await indexDBHandler.put({ id: lobbyId, handler });
	}
	await indexDBHandler.close();
};
