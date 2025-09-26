import { SVGS } from '..';

/** An event in the timeline component */
export interface TimelineEvent {
	/** Header for event */
	header: string;
	/** Subheader for event */
	subHeader: string;
	/** What year the event ended */
	endYear: number;
	/** The icon to render for the event */
	icon: keyof typeof SVGS;
	/** What year the event started */
	startYear?: number;
	/** Description of the event */
	description?: string | string[];
}
