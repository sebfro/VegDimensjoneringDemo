import { Player } from '@lottiefiles/react-lottie-player';
import animasjon from './animasjon.json';
import { CSSProperties } from 'styled-components';
import { FC } from 'react';

interface MålebilAnimasjonProps {
	className?: string;
	height?: CSSProperties['height'];
	width?: CSSProperties['width'];
}

export const MålebilAnimasjon: FC<MålebilAnimasjonProps> = ({
	className,
	height = '400px',
	width = '400px',
}) => {
	return <Player className={className} autoplay loop src={animasjon} style={{ height, width }} />;
};
