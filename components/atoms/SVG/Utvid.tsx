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

export const Utvid: React.FC<SvgProps> = ({ pathFill = '#ECECEC', ...props }) => (
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
			d='M18 29v-2h-3.59l4.5-4.5-1.41-1.41-4.5 4.5V22h-2v7h7Zm4.5-10.09 4.5-4.5V18h2v-7h-7v2h3.59l-4.5 4.5 1.41 1.41Z'
		/>
	</svg>
);
