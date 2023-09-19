const ShortDefaultDateValue = 'dd.mm.åå xx:xx';
const LongDefaultDateValue = 'dd.mm.åå xx:xx';

//Foramterer dato
// Short viser dato slik dd.mm.yyyy
// long viser slik dd.mm.yy hh:mm
export const formatDateString = (format: 'short' | 'long', date?: string) => {
	if (!date) return format === 'short' ? ShortDefaultDateValue : LongDefaultDateValue;
	const dateOb = new Date(date);
	const year = format === 'short' ? 'numeric' : '2-digit';
	const formattedDate = `${dateOb.toLocaleDateString('no-nb', {
		day: '2-digit',
		month: 'long',
		year: year,
	})}`;
	return format === 'short'
		? formattedDate.replace('.', '')
		: `${formattedDate} ${dateOb.getHours()}:${dateOb.getMinutes()}`;
};

//Formaterer klokkeslett
//Formatet er hh:mm
export const formatTimeString = (date?: string) => {
	if (!date) return 'xx:xx';
	const dateOb = new Date(date);
	return `${dateOb.toLocaleTimeString('no-nb', {
		hour: '2-digit',
		minute: '2-digit',
	})}`;
};
// Returnerer år i formatet YYYY
export const formatGetYear = (date?: string): string => {
	if (!date) return 'YYYY';
	const dateOb = new Date(date);
	return dateOb.getFullYear().toString();
};

// Formatterer tall til å ha mellomrom som tusenskille.
export const formatNumber = (value?: string | number): string => {
	if (value) return String(value.toString()).replace(/(.)(?=(\d{3})+$)/g, '$1 ');
	return '';
};

//Formatterer tlf nr med mellomrom
export const formatTlfNummer = (value?: string): string => {
	if (value && value.length === 8) {
		return value.substring(0, 3) + ' ' + value.substring(3, 5) + ' ' + value.substring(5, 9);
	}
	return '';
};

/**
 * Formaterer bytes til GB eller MB
 * @param bytes
 * @param dataType
 * @example
 * const { dataMengde, dataType } = formatBytesToGB(123456789);
 */
export const formatBytesToGB = (
	bytes: number,
	dataType?: 'MB' | 'GB'
): {
	dataMengde: string;
	dataType: 'MB' | 'GB';
} => {
	const gigabytes = bytes / 1073741824;
	if (gigabytes > 1 || dataType === 'GB') {
		return { dataMengde: erGydldigDataMegde(gigabytes), dataType: 'GB' };
	} else {
		// Megabytes
		const megabytes = bytes / 1048576;
		return { dataMengde: erGydldigDataMegde(megabytes), dataType: 'MB' };
	}
};
// Sjekker om Datamnegde ikke er Nan. Hvis det er Nan returnerer den 0
const erGydldigDataMegde = (dataMengde: number) =>
	dataMengde.toString() === 'NaN' ? '0' : dataMengde.toFixed(1);

export const isNumberString = (value: string) => /^\d+$/.test(value);
