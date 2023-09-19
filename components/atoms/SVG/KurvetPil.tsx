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

export const KurvetPil: React.FC<SvgProps> = ({ pathFill = '#FCFCFC', ...props }) => (
	<svg
		xmlns='http://www.w3.org/2000/svg'
		viewBox='0 0 26 26'
		width='100%'
		height='100%'
		fill='none'
		{...props}
	>
		<path
			fill={pathFill}
			d='m24 25 2.887-5h-5.774L24 25ZM0 1.5h14v-1H0v1ZM23.5 11v9.5h1V11h-1ZM14 1.5a9.5 9.5 0 0 1 9.5 9.5h1C24.5 5.201 19.799.5 14 .5v1Z'
		/>
	</svg>
);
