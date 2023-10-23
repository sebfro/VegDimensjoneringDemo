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

export const AirTemperature: React.FC<SvgProps> = ({
	pathFill = Colors.primaryTekst,
	...props
}) => {
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
				d='M11.9987 2.24956C10.3443 2.24956 8.99927 3.59461 8.99927 5.24897V12.8366C8.99927 13.5161 8.73213 14.1066 8.39938 14.5518C7.83231 15.3017 7.49956 16.2343 7.49956 17.2466C7.49956 19.7305 9.51479 21.7458 11.9987 21.7458C14.4826 21.7458 16.4978 19.7305 16.4978 17.2466C16.4978 16.2343 16.1651 15.3017 15.598 14.5518C15.2652 14.1066 14.9981 13.5161 14.9981 12.8366V5.24897C14.9981 3.59461 13.653 2.24956 11.9987 2.24956ZM6.74971 5.24897C6.74971 2.35267 9.09769 0 11.9987 0C14.8997 0 17.2477 2.34798 17.2477 5.24897V12.8366C17.2477 12.9162 17.2805 13.0428 17.3976 13.2021C18.2459 14.3316 18.7474 15.7329 18.7474 17.2513C18.7474 20.9772 15.7245 24 11.9987 24C8.27285 24 5.25 20.9725 5.25 17.2466C5.25 15.7282 5.75146 14.3269 6.59974 13.1974C6.7169 13.0381 6.74971 12.9115 6.74971 12.8319V5.24897ZM14.2482 17.2466C14.2482 18.4886 13.2406 19.4962 11.9987 19.4962C10.7567 19.4962 9.74912 18.4886 9.74912 17.2466C9.74912 16.2671 10.3771 15.4329 11.2488 15.1236V9.37317C11.2488 8.96075 11.5863 8.62332 11.9987 8.62332C12.4111 8.62332 12.7485 8.96075 12.7485 9.37317V15.1236C13.6202 15.4329 14.2482 16.2671 14.2482 17.2466Z'
				fill={props.fill || pathFill}
			/>
		</svg>
	);
};
