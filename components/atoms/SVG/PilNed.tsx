import React, { SVGProps } from 'react';
import { Colors } from '../../../styles/colors.ts';

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

export const PilNed: React.FC<SvgProps> = ({ pathFill = Colors.sort, ...props }) => (
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
			d='M10 16.482 11.375 15 20 22.347 28.625 15 30 16.482 20 25l-10-8.518Z'
			clipRule='evenodd'
		/>
	</svg>
);
