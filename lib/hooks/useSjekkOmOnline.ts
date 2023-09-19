import { useEffect, useState } from 'react';

function getOnlineStatus(): boolean {
	return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

/**
 * Hook for å sjekke om bruker er online.
 * @returns {boolean}
 * @example
 * const online = useSjekkOmOnline();
 */
export default function useSjekkOmOnline(): boolean {
	const [onlineStatus, setOnlineStatus] = useState<boolean>(getOnlineStatus());

	const goOnline = () => setOnlineStatus(true);

	const goOffline = () => setOnlineStatus(false);

	useEffect(() => {
		window.addEventListener('online', goOnline);
		window.addEventListener('offline', goOffline);

		return () => {
			window.removeEventListener('online', goOnline);
			window.removeEventListener('offline', goOffline);
		};
	}, []);

	return onlineStatus;
}
