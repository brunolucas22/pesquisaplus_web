/* eslint-disable @typescript-eslint/no-explicit-any */
type useGetUserPreferencesProps = { module: string; option: string };

export const useGetUserPreferences = ({
	module,
	option,
}: useGetUserPreferencesProps) => {
	if (!sessionStorage.getItem('UserPreferences')) return undefined;
	const userPreference = JSON.parse(sessionStorage.getItem('UserPreferences')!);
	try {
		return userPreference[module][option];
	} catch (_) {
		return undefined;
	}
};

type useSetUserPreferencesProps = useGetUserPreferencesProps & { value: any };

export const useSetUserPreferences = ({
	module,
	option,
	value,
}: useSetUserPreferencesProps) => {
	if (!sessionStorage.getItem('UserPreferences')) {
		const userPreference: Record<string, any> = {};
		userPreference[module] = { [option]: value };

		sessionStorage.setItem('UserPreferences', JSON.stringify(userPreference));
	} else {
		const userPreference: Record<string, any> = JSON.parse(
			sessionStorage.getItem('UserPreferences')!
		);
		if (userPreference[module]) {
			userPreference[module][option] = value;
		} else {
			userPreference[module] = { [option]: value };
		}
		sessionStorage.setItem('UserPreferences', JSON.stringify(userPreference));
	}
};
