export const useBase64ToFile = (base64Data: string, fileName: string) => {
	const decodedData = atob(base64Data);
	const byteNumbers = new Array(decodedData.length);
	for (let i = 0; i < decodedData.length; i++) {
		byteNumbers[i] = decodedData.charCodeAt(i);
	}
	const byteArray = new Uint8Array(byteNumbers);
	const blob = new Blob([byteArray], { type: 'application/pdf' });
	return new File([blob], fileName, { type: blob.type });
};
