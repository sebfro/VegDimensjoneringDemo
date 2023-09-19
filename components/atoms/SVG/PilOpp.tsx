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

export const PilOpp: React.FC<SvgProps> = ({ pathFill = '#FCFCFC', ...props }) => (
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
			fillRule='evenodd'
			d='M30 23.518 28.625 25 20 17.653 11.375 25 10 23.518 20 15l10 8.518Z'
			clipRule='evenodd'
		/>
	</svg>
);
