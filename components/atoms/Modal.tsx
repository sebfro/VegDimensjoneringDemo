import React, { FC, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Colors } from '../../styles/colors';
import SvgGetter from './SVG/SvgGetter/SvgGetter.tsx';
import { BodyMediumTekst, TittelStorTekst } from './TekstKomponenter.ts';
import ScondaryButton from './Knapper/ScondaryButton';
import PrimaryButton from './Knapper/PrimaryButton';

export type BaseModalProps = {
	erÅpen: boolean;
	setErÅpen: (erÅpen: boolean) => void;
	handleLukkCallback?: () => void;
	handleBekreft?: () => void;
	loading?: boolean;
	children?: React.ReactNode;
};

export interface ModalProps extends BaseModalProps {
	tekster: {
		tittel: string;
		beskrivelse: string;
		lukke: string;
		bekreft?: string;
	};
	className?: string;
	inkluderIkon?: boolean;
}

// https://dev.to/elsyng/react-modal-dialog-using-html-dialog-element-5afk
export const Modal: FC<ModalProps> = ({
	erÅpen,
	setErÅpen,
	handleLukkCallback,
	handleBekreft,
	tekster,
	children,
	className,
	inkluderIkon = true,
	loading = false,
}) => {
	const modalRef = useRef<HTMLDialogElement>(null);
	const { lukke, bekreft } = tekster;
	const handleLukk = () => {
		const currRef = modalRef.current;
		if (!currRef) return;
		currRef.checkVisibility() && currRef.close();
		handleLukkCallback?.() || setErÅpen(false);
	};
	useEffect(() => {
		const curr = modalRef.current;
		if (curr) {
			// For at dialog skal oppføre seg som en modal må vi bruke showModal metoden når vi åpner den.
			// Hvis er erÅpen er true så sjekker først om den allerede er åpne før vi kaller showModal. Kaster en exception ellers.
			erÅpen ? !curr.checkVisibility() && curr.showModal() : curr.close();
		}
	}, [erÅpen]);

	return (
		<StyledModal ref={modalRef} className={className}>
			<Overskrift inkluderIkon={inkluderIkon}>
				{inkluderIkon && <StyledSvgGetter icon={'Advarsel'} wrapSvg størrelse='medium' />}
				<TittelStorTekst>{tekster.tittel}</TittelStorTekst>
			</Overskrift>
			<Innhold>
				<Beskrivelse>{tekster.beskrivelse}</Beskrivelse>
				{children && children}
				<KnappeRad>
					{bekreft && <PrimaryButton loading={loading} tekst={bekreft} onClick={handleBekreft} />}
					<ScondaryButton tekst={lukke} onClick={handleLukk} />
				</KnappeRad>
			</Innhold>
		</StyledModal>
	);
};

const StyledModal = styled.dialog`
	background-color: ${Colors.mørkSort};
	width: min(100% - 2rem, 55rem);
	border: none;
	border-radius: 1rem;
	margin-inline: auto;
	padding: 3rem 8rem 4rem 3.5rem;

	::backdrop {
		opacity: 0.6;
		background-color: ${Colors.mørkSort};
	}

	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
`;

export const KnappeRad = styled.div`
	display: flex;
	column-gap: 2rem;
	margin-top: 3rem;
`;

const Innhold = styled.div`
	margin-left: 4.5rem;
`;

const Overskrift = styled.div<{ inkluderIkon: boolean }>`
	display: grid;
	margin-bottom: 1.5rem;
	align-items: center;
	${({ inkluderIkon }) =>
		inkluderIkon
			? css`
					grid-template-columns: auto 1fr;
			  `
			: css`
					margin-left: 4.5rem;
			  `}
`;

const StyledSvgGetter = styled(SvgGetter)`
	margin-right: 2rem;
`;

const Beskrivelse = styled(BodyMediumTekst)``;
