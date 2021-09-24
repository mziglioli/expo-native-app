export const logInfo = (message: string, logFile: string, info: any): void => {
	console.log(message, logFile, info);
};

export const logError = (message: string, logFile: string, info: any, e: any): void => {
	console.error(message, logFile, info, e);
};
