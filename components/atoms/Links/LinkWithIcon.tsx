import React, { useCallback, useState } from 'react';
import styled, { css } from 'styled-components';
import SvgGetter from '../SVG/SvgGetter/SvgGetter';
import { FocusVisibleStyle } from '../StyledComponents/Common';
import { Icons } from '../SVG/SvgGetter/Icons';
import { Colors } from '../../../styles/colors';
import { TextStyles } from '../../../styles/TextStyles';

interface LinkWithIconProps {
	url: string;
	className?: string;
	text?: string;
	icon?: Icons;
	onClick?: () => void;
}

const LinkWithIcon: React.FC<LinkWithIconProps> = ({
	url,
	className,
	text = '',
	icon = 'Link',
	onClick,
}) => {
	const [active, setActive] = useState(false);

	const handleKeyDown = useCallback((e: any) => {
		if (e.key === 'Enter' || e.key === ' ') {
			setActive(true);
			setTimeout(() => setActive(false), 500);
		}
	}, []);

	return (
		<StyledLink
			href={url}
			target='_blank'
			onKeyDown={handleKeyDown}
			onClick={onClick}
			className={className}
			active={active}
			tabIndex={0}
		>
			<SvgGetter icon={icon} pathFill={Colors.information.secondaryInfo} />
			<p>{text}</p>
		</StyledLink>
	);
};

export default LinkWithIcon;

const StyledLink = styled.a<{ active: boolean }>`
	display: flex;
	column-gap: 12px;
	align-items: center;

	:hover {
		cursor: pointer;
	}

	${({ active }) =>
		active &&
		css`
			opacity: 50%;
		`};

	:active {
		opacity: 50%;
	}

	p {
		${TextStyles.BodyMedium};
		color: ${Colors.information.secondaryInfo};
		text-decoration: underline;
		text-underline-offset: 3px;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}

	${FocusVisibleStyle};
`;
