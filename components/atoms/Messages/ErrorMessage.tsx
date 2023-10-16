import React from 'react';
import styled, { css } from 'styled-components';

import SvgGetter from '../SVG/SvgGetter/SvgGetter';
import { Icons } from '../SVG/SvgGetter/Icons';
import { Colors } from '../../../styles/colors';
import { TextStyles } from '../../../styles/TextStyles.ts';

type MessageBoxTypes = 'Info' | 'Success' | 'Warning' | 'Error';

type MessageBoxSelectedPropsType = {
	icon: Icons;
	color: string;
	borderColor: string;
	fill?: string;
};

interface MessageBoxProps {
	messageBoxType: MessageBoxTypes;
	wrapSvgIcon?: boolean;
	icon?: Icons;
	includeIcon?: boolean;
	className?: string;
	feilmeldinger: string[];
}

/**
 * ErrorMessage
 * @param messageBoxType {@link MessageBoxTypes} "Info" | "Success" | "Warning" | "Error" <br/>
 * @param className {string} css className <br/>
 * @param feilmeldinger {string[]} liste med feilmeldinger <br/>
 * @constructor  <ErrorMessage feilmeldinger={['melding', 'melding2']} messageBoxType='Error' /> <br/>
 */
const ErrorMessage: React.FC<MessageBoxProps> = ({
	feilmeldinger,
	messageBoxType,
	className = '',
}) => {
	let messageBoxSelectedPropsType: MessageBoxSelectedPropsType;

	switch (messageBoxType) {
		case 'Success':
			messageBoxSelectedPropsType = {
				icon: 'CheckMark',
				color: Colors.blå,
				borderColor: Colors.blå,
			};
			break;
		case 'Error':
			messageBoxSelectedPropsType = {
				icon: 'Advarsel',
				color: Colors.background.redBg,
				borderColor: Colors.rød,
				fill: Colors.rød,
			};
			break;
		case 'Warning':
			messageBoxSelectedPropsType = {
				icon: 'Advarsel',
				color: Colors.information.orangeBg,
				borderColor: Colors.information.orangeDark,
			};
			break;
		case 'Info':
		default:
			messageBoxSelectedPropsType = {
				icon: 'CheckMark',
				color: Colors.lysBlå,
				borderColor: Colors.blå,
			};
			break;
	}
	return (
		<MessageCard className={className} {...messageBoxSelectedPropsType}>
			<Content>
				<StyledSvgGetter
					icon={messageBoxSelectedPropsType.icon}
					fill={messageBoxSelectedPropsType.fill}
					wrapSvg
				/>
				<ContentChildWrapper>
					<ul>
						{feilmeldinger.map((melding, index) => (
							<li key={index}>{melding}</li>
						))}
					</ul>
				</ContentChildWrapper>
			</Content>
		</MessageCard>
	);
};

export default ErrorMessage;

const Content = styled.div`
	width: 100%;
	display: flex;
	column-gap: 16px;
`;

const ContentChildWrapper = styled.div`
	width: 100%;
	${TextStyles.BodyMedium};
`;

const MessageCard = styled.div<Pick<MessageBoxSelectedPropsType, 'borderColor' | 'color'>>`
	${({ borderColor, color }) => css`
		background-color: ${color};
		border: 1px solid ${borderColor};
	`};
	padding: 0.75rem 1rem;
	border-radius: 2px;
	width: 100%;
`;

const StyledSvgGetter = styled(SvgGetter)`
	width: 1.5rem;
	height: 1.5rem;
`;
