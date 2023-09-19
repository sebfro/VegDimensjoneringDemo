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

export const Advarsel: React.FC<SvgProps> = ({ pathFill = '#ECECEC', ...props }) => (
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
			d='M22.222 22.222h-4.444V8.89h4.444v13.333ZM20 31.778A2.889 2.889 0 1 1 20 26a2.889 2.889 0 0 1 0 5.778ZM28.289 0H11.71L0 11.711V28.29L11.711 40H28.29L40 28.289V11.71L28.289 0Z'
		/>
	</svg>
);
