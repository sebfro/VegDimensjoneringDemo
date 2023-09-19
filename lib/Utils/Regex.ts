const filNavnRegex = /^[ERF]V\d+_S\d+D\d+_M\d+_F\d+\.(jpg|jpeg|png)$/i;

export const sjekkFilnavn = (filnavn: string) => {
	return filNavnRegex.test(filnavn);
};
