import { FC } from 'react';
import { BaseModalProps, KnappeRad, Modal } from '../Modal';
import styled, { css } from 'styled-components';
import Kort from '../Kort';
import { TextStyles } from '../../../styles/TextStyles';
import { Colors } from '../../../styles/colors';

interface InneholderUgyldigeBilderProps extends BaseModalProps {
	filer: string[];
}

const InneholderUgyldigeBilder: FC<InneholderUgyldigeBilderProps> = (props) => {
	return (
		<StyledModal
			tekster={{
				tittel: 'Noen mapper inneholder ugyldige bilder',
				beskrivelse:
					'Velg en vegbildemappe (f.eks FV00404) eller fjern ugyldige bilder fra vegbildermappen.',
				lukke: 'Tilbake til forside',
			}}
			{...props}
		>
			<Innhold>
				<Tittel>Følgende bilder kan ikke lastes opp</Tittel>
				<StyledKort>
					<KortInnhold>
						{props.filer.map((fil, index) => (
							<p key={index}>{fil}</p>
						))}
					</KortInnhold>
				</StyledKort>
			</Innhold>
		</StyledModal>
	);
};

export default InneholderUgyldigeBilder;

const StyledModal = styled(Modal)`
	${KnappeRad} {
		margin-top: 3rem;
	}
`;

const Innhold = styled.div``;

const Tittel = styled.h3`
	${TextStyles.BodyLiten};
	margin: 1.5rem 0;
`;

//https://css-tricks.com/the-current-state-of-styling-scrollbars-in-css/
const Scrollbar = css`
	overflow: auto;

	::-webkit-scrollbar {
		width: 0.375rem;
	}

	::-webkit-scrollbar-track {
		background-color: transparent;
	}

	::-webkit-scrollbar-thumb {
		background-color: ${Colors.oransje};
		border-radius: 5px;
	}

	::-webkit-scrollbar-thumb:hover {
		background-color: ${Colors.hvit};
	}
`;

const StyledKort = styled(Kort)`
	background-color: ${Colors.sort};
	height: 8.25rem;
	border: none;
	padding: 1.5rem 1.5rem 0 2.5rem;
`;

const KortInnhold = styled.div`
	display: flex;
	flex-direction: column;
	overflow-y: auto;
	height: 100%;
	row-gap: 1rem;
	padding-bottom: 1rem;
	${Scrollbar}
`;
