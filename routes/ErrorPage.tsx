import { Link, useRouteError } from 'react-router-dom';
import { Container } from '../styles/BasePageLayout.ts';

const ErrorPage = () => {
	const error: any = useRouteError();
	return (
		<Container>
			<h1>Noe gikk galt!</h1>
			<p>Ta kontakt med support om det vedvarer</p>
			<p>
				<i>{error?.statusText || error?.message}</i>
			</p>
			<Link to='/'>Gå tilbake</Link>
		</Container>
	);
};

export default ErrorPage;
