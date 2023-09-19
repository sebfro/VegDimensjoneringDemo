import { FC } from 'react';
import { CSSProperties } from 'styled-components';
import IkonKnapp from './IkonKnapp';
import { ButtonProps } from './Button';

interface UtvidKnappProps extends ButtonProps {
	erÅpen: boolean;
	ikonFarge?: CSSProperties['color'];
}

const UtvidKnapp: FC<UtvidKnappProps> = ({ erÅpen, ...props }) => {
	return <IkonKnapp knappType='gjennomsiktig' ikon={erÅpen ? 'PilOpp' : 'PilNed'} {...props} />;
};

export default UtvidKnapp;
