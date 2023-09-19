import * as React from 'react';
import { SvgProps } from './SvgGetter/SvgGetter';

export const CheckMark: React.FC<SvgProps> = ({ fill = 'none', opacity }) => (
	<svg width={18} height={14} fill={fill} opacity={opacity} xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M16 2 6.375 12 2 7.455'
			stroke='#444F55'
			strokeWidth={3}
			strokeLinecap='round'
			strokeLinejoin='round'
		/>
	</svg>
);
