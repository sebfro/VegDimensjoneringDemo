import { FC } from 'react';
import styled from 'styled-components';

import HovedKnapp from './HovedKnapp';
import SekundRKnapp from './SekundærKnapp';

type FooterProps = {
	/**Custom class */
	className?: string;
	kanppProps: {
		avbrytTekst?: string;
		avbrytOnClick: () => void;
		bekreftTekst?: string;
		bekreftOnClick: () => void;
	};
	loading?: boolean;
};

export const Footer: FC<FooterProps> = ({
	className,
	kanppProps: {
		avbrytTekst = 'Avbryt',
		avbrytOnClick,
		bekreftTekst = 'Fortsett til vegoverbygning',
		bekreftOnClick,
	},
	loading = false,
}) => {
	return (
		<div className={className}>
			<Container>
				<StyledRow>
					<SaveAndCancelWrapper>
						<SekundRKnapp
							tekst={avbrytTekst}
							onClick={avbrytOnClick}
							type='button'
							border
							disabled={loading}
						/>
						<HovedKnapp
							tekst={bekreftTekst}
							onClick={bekreftOnClick}
							type='button'
							border={false}
							disabled={loading}
							loading={loading}
							justifyContent='center'
						/>
					</SaveAndCancelWrapper>
				</StyledRow>
			</Container>
		</div>
	);
};

export const Container = styled.div`
	background-color: #ffffff;
	text-align: center;
	padding: 24px 64px 40px;
	@media (max-width: 580px) {
		padding: 16px 32px 32px;
		flex-direction: column;
	}
	position: fixed;
	left: 0;
	bottom: 0;
	height: auto;
	width: 100%;
	z-index: 4;
	box-shadow: 0 0 6px 2px rgba(53, 62, 67, 0.08);
`;

const StyledRow = styled.div`
	display: flex;
	justify-content: space-between;
	@media (max-width: 580px) {
		flex-direction: column;
	}
`;

const SaveAndCancelWrapper = styled.div`
	display: flex;
	column-gap: 32px;
	width: max-content;

	button {
		width: 100%;
	}

	@media (max-width: 580px) {
		width: 100%;
		display: flex;
		flex-direction: column;
		row-gap: 16px;
	}
`;
