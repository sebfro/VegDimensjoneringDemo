import React, { SVGProps } from 'react';

/**
 * viewBox='0 0 24 24' er den faktiske størrelsen på svg'en. De to siste veridene må være svgen sin
 * faktiske bredde og høyde. Hvis ikke vil svg'en bli strukket til å fylle hele plassen den har.
 * widt og height er satt til 100% for å fylle hele plassen den har.
 * @param props
 * @constructor
 */
interface SvgProps extends SVGProps<SVGSVGElement> {
	pathFill?: string;
}

export const Informasjon: React.FC<SvgProps> = ({ pathFill = '#FCFCFC', ...props }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 40 40'
		width='100%'
		height='100%'
		fill='none'
		{...props}
	>
		<path
			fill={pathFill}
			d='M19 17h2v-2h-2v2Zm1 11c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8Zm0-18a10 10 0 1 0 0 20.001A10 10 0 0 0 20 10Zm-1 15h2v-6h-2v6Z'
		/>
	</svg>
);
