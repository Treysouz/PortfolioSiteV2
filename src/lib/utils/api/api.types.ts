/** Object representing data for an API error */
export interface ApiError {
	/** Status code for error */
	status: number;
	/** Message for error */
	message: string;
}
