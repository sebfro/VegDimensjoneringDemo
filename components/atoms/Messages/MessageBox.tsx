import React, { ReactElement } from 'react';
import styled, { css, CSSProperties } from 'styled-components';

import SvgGetter from '../SVG/SvgGetter/SvgGetter';
import Kort from '../Kort';
import { Icons } from '../SVG/SvgGetter/Icons';
import { Colors } from '../../../styles/colors';

type MessageBoxTypes = 'Info' | 'Success' | 'Warning';

type MessageBoxSelectedPropsType = {
	icon: Icons;
	color: string;
	borderColor: string;
	fill?: string;
};

interface MessageBoxProps {
	contentChild: ReactElement;
	messageBoxType: MessageBoxTypes;
	alignItems?: CSSProperties['alignItems'];
	wrapSvgIcon?: boolean;
	icon?: Icons;
	includeIcon?: boolean;
	className?: string;
}

/**
 * MessageBox
 * @param contentChild {ReactElement} <br/>
 * @param messageBoxType {MessageBoxTypes} <br/>
 * @param alignItems {CSSProperties['alignItems']} <br/>
 * @param wrapSvgIcon {boolean} <br/>
 * @param icon {Icons} <br/>
 * @param includeIcon {boolean} <br/>
 * @param className {string} <br/>
 * @constructor  <br/>
 */
const MessageBox: React.FC<MessageBoxProps> = ({
	contentChild,
	messageBoxType,
	alignItems,
	wrapSvgIcon,
	icon,
	includeIcon = true,
	className = '',
}) => {
	let messageBoxSelectedPropsType: MessageBoxSelectedPropsType;

	switch (messageBoxType) {
		case 'Success':
			messageBoxSelectedPropsType = {
				icon: 'Informasjon',
				color: Colors.information.infoBg,
				borderColor: Colors.information.secondaryInfo,
			};
			break;
		case 'Warning':
			messageBoxSelectedPropsType = {
				icon: 'Informasjon',
				color: Colors.primaryTekst,
				borderColor: Colors.rød,
				fill: Colors.information.secondaryError,
			};
			break;
		case 'Info':
		default:
			messageBoxSelectedPropsType = {
				icon: 'Informasjon',
				color: Colors.information.infoBg,
				borderColor: Colors.information.secondaryInfo,
			};
			break;
	}
	return (
		<StyledCard className={className} {...messageBoxSelectedPropsType}>
			<Content alignItems={alignItems}>
				{includeIcon && (
					<SvgGetter
						icon={icon || messageBoxSelectedPropsType.icon}
						fill={messageBoxSelectedPropsType.fill}
						wrapSvg={wrapSvgIcon}
					/>
				)}
				<ContentChildWrapper>{contentChild}</ContentChildWrapper>
			</Content>
		</StyledCard>
	);
};

export default MessageBox;

const Content = styled.div<{ alignItems?: CSSProperties['alignItems'] }>`
	width: 100%;
	${({ alignItems }) =>
		alignItems &&
		css`
			align-items: ${alignItems};
		`};
	display: flex;
	column-gap: 1rem;
`;

const ContentChildWrapper = styled.div`
	width: 100%;
`;

const StyledCard = styled(Kort)<MessageBoxSelectedPropsType>`
	${(props) => css`
		background-color: ${props.color};
		border: 1px solid ${props.borderColor};
	`};
	margin-top: 1rem;
	padding: 1.5rem 2rem;
	border-radius: 0.25rem;
`;
