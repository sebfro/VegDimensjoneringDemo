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

export const StatusLoader: React.FC<SvgProps> = ({ pathFill = '#FF9600', ...props }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 32 32'
		width='100%'
		height='100%'
		fill='none'
		{...props}
	>
		<path
			stroke={pathFill}
			strokeLinecap='round'
			strokeWidth={2}
			d='M24 16a8 8 0 1 1-4.976-7.406'
		/>
	</svg>
);
