import React, { FC, useEffect } from 'react';

interface PageProps {
	tittel: string;
	children: React.ReactNode;
}

const Page: FC<PageProps> = ({ tittel, children }) => {
	useEffect(() => {
		document.title = tittel || '';
	}, [tittel]);
	return children;
};

export default Page;
