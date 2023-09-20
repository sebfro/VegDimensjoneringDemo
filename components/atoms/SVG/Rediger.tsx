import * as React from 'react';
import { SvgProps } from './SvgGetter/SvgGetter';
import { Colors } from '../../../styles/colors';

export const Rediger: React.FC<SvgProps> = ({ fill = Colors.primaryTekst, opacity }) => (
	<svg width={18} height={17} fill='none' opacity={opacity} xmlns='http://www.w3.org/2000/svg'>
		<path
			d='M0 13.257v2.787c0 .257.21.458.48.458h2.913a.46.46 0 0 0 .335-.137L14.193 6.364l-3.594-3.438L.144 12.927a.44.44 0 0 0-.144.33Zm16.972-9.551a.885.885 0 0 0 0-1.293L14.73.268a.985.985 0 0 0-1.352 0l-1.753 1.678 3.593 3.437 1.754-1.677Z'
			fill={fill}
		/>
	</svg>
);
