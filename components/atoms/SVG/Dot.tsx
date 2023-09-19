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

export const Dot: React.FC<SvgProps> = ({ pathFill = '#9C9C9C', ...props }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 33 32'
		width='100%'
		height='100%'
		fill='none'
		{...props}
	>
		<circle cx={16.5} cy={16} r={4} fill={pathFill} />
	</svg>
);
