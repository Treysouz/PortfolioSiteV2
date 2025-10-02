/** Base props shared by all combobox variants. */
interface BaseComboboxProps<Entity> {
	/** Display label for the combobox component */
	label: string;
	/** Array of selectable options */
	options: Entity[];
	/** Key within Entity to use for displaying and searching options */
	searchKey: keyof Entity;
	/** Key within Entity to use as the unique identifier */
	idKey: keyof Entity;
	/** Whether the combobox dropdown is open */
	open?: boolean;
	/** Additional CSS classes to apply to the component */
	class?: string;
	/** Text size for the search input field */
	inputTextSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
	/**Whether search box is enabled */
	enableSearch?: boolean;
	/**Placeholder text to show if no selection is made */
	placeholder?: string;
	/** Select handler */
	onselect?: (entity?: Entity | Entity[]) => unknown;
}

/** Props for single selection mode combobox. */
export interface SingleComboboxProps<Entity> extends BaseComboboxProps<Entity> {
	/** Whether we're in multiple selection mode */
	multiple?: false;
	/** The selected entity */
	value?: Entity;
}

/** Props for multiple selection mode combobox.*/
export interface MultipleComboboxProps<Entity> extends BaseComboboxProps<Entity> {
	/** Whether we're in multiple selection mode */
	multiple: true;
	/** Array of currently selected entities */
	value?: Entity[];
}
