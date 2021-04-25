/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import useFirestore from 'src/hooks/useFirestore';
import useFirebase from 'src/hooks/useFirebase';

const useUser = () => {
	const { auth } = useFirebase();
	const [isAdmin, setIsAdmin] = React.useState(false);
	const { isCurrentUserAdmin } = useFirestore();

	React.useEffect(() => {
		ensureAdmin();
	}, [auth?.user?.email]);

	const ensureAdmin = async () => {
		const isAdmin = await isCurrentUserAdmin();
		setIsAdmin(isAdmin);
	};

	return {
		isAdmin,
		email: auth?.user?.email,
		displayName: auth?.user?.displayName,
	};
};

export default useUser;
