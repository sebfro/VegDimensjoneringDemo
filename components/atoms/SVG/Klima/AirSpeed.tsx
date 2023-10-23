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

export const AirSpeed: React.FC<SvgProps> = ({ pathFill = Colors.primaryTekst, ...props }) => {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			viewBox='0 0 24 24'
			width='100%'
			height='100%'
			fill='none'
			{...props}
		>
			<g clipPath='url(#clip0_607_14281)'>
				<path
					d='M13.5 1.125C13.5 1.74844 14.0016 2.25 14.625 2.25H16.6875C17.8266 2.25 18.75 3.17344 18.75 4.3125C18.75 5.45156 17.8266 6.375 16.6875 6.375H1.125C0.501562 6.375 0 6.87656 0 7.5C0 8.12344 0.501562 8.625 1.125 8.625H16.6875C19.0688 8.625 21 6.69375 21 4.3125C21 1.93125 19.0688 0 16.6875 0H14.625C14.0016 0 13.5 0.501562 13.5 1.125ZM16.5 18.375C16.5 18.9984 17.0016 19.5 17.625 19.5H19.6875C22.0688 19.5 24 17.5688 24 15.1875C24 12.8062 22.0688 10.875 19.6875 10.875H1.125C0.501562 10.875 0 11.3766 0 12C0 12.6234 0.501562 13.125 1.125 13.125H19.6875C20.8266 13.125 21.75 14.0484 21.75 15.1875C21.75 16.3266 20.8266 17.25 19.6875 17.25H17.625C17.0016 17.25 16.5 17.7516 16.5 18.375ZM5.625 24H7.6875C10.0688 24 12 22.0688 12 19.6875C12 17.3062 10.0688 15.375 7.6875 15.375H1.125C0.501562 15.375 0 15.8766 0 16.5C0 17.1234 0.501562 17.625 1.125 17.625H7.6875C8.82656 17.625 9.75 18.5484 9.75 19.6875C9.75 20.8266 8.82656 21.75 7.6875 21.75H5.625C5.00156 21.75 4.5 22.2516 4.5 22.875C4.5 23.4984 5.00156 24 5.625 24Z'
					fill={props.fill || pathFill}
				/>
			</g>
			<defs>
				<clipPath id='clip0_607_14281'>
					<rect width='24' height='24' fill='white' />
				</clipPath>
			</defs>
		</svg>
	);
};
