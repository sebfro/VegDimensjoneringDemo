import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { Urls } from '../lib/Urls.ts';
import ErrorPage from '../routes/ErrorPage.tsx';
import Page from '../components/atoms/Page.tsx';
import Backoffice from '../routes/Backoffice/Backoffice.tsx';
import { Dimejsonering } from '../components/Eksperimenter/Dimejsonering.tsx';
import { Startside } from '../routes/Startside.tsx';

// Tutorial jeg brukte: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route
				path={Urls.index}
				element={
					<Page tittel={'Startside'}>
						<Startside />
					</Page>
				}
				errorElement={
					<Page tittel={'Error'}>
						<ErrorPage />
					</Page>
				}
			/>
			<Route
				path={Urls.backoffice.index}
				element={
					<Page tittel={'Backoffice'}>
						<Backoffice />
					</Page>
				}
			/>
			<Route
				path={Urls.dimensjonering}
				element={
					<Page tittel={'Dimensjonering'}>
						<Dimejsonering />
					</Page>
				}
			/>
		</Route>
	)
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
