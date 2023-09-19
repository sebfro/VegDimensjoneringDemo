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

export const TommelOpp: React.FC<SvgProps> = ({ pathFill = '#444F55', ...props }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 24 24'
		width='100%'
		height='100%'
		fill='none'
		{...props}
	>
		<path
			fill={pathFill}
			d='M16 2c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5Zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3Zm3 6h-2c0-1.2-.75-2.28-1.87-2.7L8.97 11H1v11h6v-1.44l7 1.94 8-2.5v-1c0-1.66-1.34-3-3-3ZM5 20H3v-7h2v7Zm8.97.41L7 18.5V13h1.61l5.82 2.17c.34.13.57.46.57.83 0 0-2-.05-2.3-.15l-2.38-.79-.63 1.9 2.38.79c.51.17 1.04.25 1.58.25H19c.39 0 .74.24.9.57l-5.93 1.84Z'
		/>
	</svg>
);
