import React, { SVGProps } from 'react';
import { Colors } from '../../../../styles/colors';

/**
 * viewBox='0 0 24 24' er den faktiske størrelsen på svg'en. De to siste veridene må være svgen sin
 * faktiske bredde og høyde. Hvis ikke vil svg'en bli strukket til å fylle hele plassen den har.
 * widt og height er satt til 100% for å fylle hele plassen den har.
 * @param props
 * @constructor
 */
interface SvgProps extends SVGProps<SVGSVGElement> {
	pathFill?: string;
	color?: string;
}

export const Mountain: React.FC<SvgProps> = ({ pathFill = Colors.primaryTekst, ...props }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			width='100%'
			height='100%'
			fill='none'
			{...props}
		>
			<path
				d='M21.75 19.8797C21.75 20.0859 21.5859 20.25 21.3797 20.25H2.62031C2.41406 20.25 2.25 20.0859 2.25 19.8797C2.25 19.8094 2.26875 19.7437 2.30625 19.6828L7.0125 12.1875L8.86406 14.5687C9.07969 14.8453 9.4125 15.0047 9.76406 15.0047C10.1156 15.0047 10.4438 14.8359 10.6547 14.5547L12.5625 12H16.875L21.6937 19.6828C21.7312 19.7437 21.75 19.8094 21.75 19.8797ZM15.4594 9.75H12C11.6438 9.75 11.3109 9.91875 11.1 10.2L9.73594 12.0234L8.2875 10.1578L12 4.23281L15.4594 9.75ZM2.62031 22.5H21.3797C22.8281 22.5 24 21.3281 24 19.8797C24 19.3875 23.8594 18.9047 23.5969 18.4875L13.4437 2.29688C13.1344 1.8 12.5859 1.5 12 1.5C11.4141 1.5 10.8703 1.8 10.5562 2.29688L0.403125 18.4875C0.140625 18.9047 0 19.3875 0 19.8797C0 21.3281 1.17188 22.5 2.62031 22.5Z'
				fill={props.fill || pathFill}
			/>
		</svg>
	);
};
