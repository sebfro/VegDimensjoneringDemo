import styled from 'styled-components';
import { Loader, LoadingProps } from './Loader';
import { FC } from 'react';

interface LoaderWrapperProps extends LoadingProps {
	loading: boolean;
	children?: any;
}

/**
 * Returnerer enten en Loading komponenten hvis loading er true.
 * Eller returneres children wrappet i React.Fragment.
 * @param loading
 * @param  className
 * @param children
 * @param props
 * @constructor <LoaderWrapper loading={boolean} description={string}>{ReactElement/HTML tags}</LoaderWrapper>
 */
const LoaderWrapper: FC<LoaderWrapperProps> = ({ loading, className, children, ...props }) => {
	if (loading) {
		return (
			<Wrapper className={className}>
				<Loader {...props} />
			</Wrapper>
		);
	} else {
		return <>{children}</>;
	}
};

export default LoaderWrapper;

const Wrapper = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;
