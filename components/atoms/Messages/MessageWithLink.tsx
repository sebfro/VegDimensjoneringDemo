import { FC } from 'react';
import { LabelTekst } from '../TekstKomponenter';
import LinkWithIcon from '../Links/LinkWithIcon';
import styled from 'styled-components';
import MessageBox from './MessageBox';
import { TextStyles } from '../../../styles/TextStyles';

interface MessageWithLinkProps {
	text: {
		heading: string;
		url: string;
		description: {
			text: string;
			reference: string;
		};
		requirement?: string;
	};
	url: string;
	className?: string;
}
export const MessageWithLink: FC<MessageWithLinkProps> = ({ text, url, className }) => {
	return (
		<MessageBox
			className={className}
			contentChild={
				<MessageBocContent>
					<Heading>
						<span>{text.heading}</span>
						<span>{text.requirement}</span>
					</Heading>
					<MessageBoxDescription>
						{text.description.text}
						<span> – {text.description.reference}</span>
					</MessageBoxDescription>
					<LinkWithIcon url={url} text={text.url} />
				</MessageBocContent>
			}
			messageBoxType='Info'
			includeIcon={false}
		/>
	);
};

const Heading = styled(LabelTekst)`
	display: flex;
	justify-content: space-between;
`;

const MessageBocContent = styled.div`
	display: flex;
	flex-direction: column;
`;

// TS gives an incorrect error here, but it works
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const MessageBoxDescription = styled(LabelTekst)`
	margin: 0.5rem 0 1rem;
	${TextStyles.BodyMedium};

	span {
		${TextStyles.PlaceholderType};
	}
`;
