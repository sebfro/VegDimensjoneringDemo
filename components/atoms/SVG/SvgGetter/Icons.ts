import * as AllSvgs from '../index';
import { SvgProps } from './SvgGetter';

export type Icons = keyof typeof AllSvgs;
export const iconsList = Object.keys(AllSvgs).map((svg) => svg as Icons);

export const IconMap = new Map<Icons, React.ElementType<SvgProps>>(
	Object.entries(AllSvgs).map(([key, value]) => {
		return [key as Icons, value];
	})
);
