/** Configuration for the sorting options intended for the sorting combobox */
export interface SortingOptionConfig {
	/**ID for the sorting option to be used as a key for the combobox */
	id: string;
	/** Column ID that the option is associated with */
	columnId: string;
	/** Header of the column */
	header?: string;
	/** Whether the column is descending */
	desc: boolean;
	/** Accessibility label for option */
	label: string;
}
