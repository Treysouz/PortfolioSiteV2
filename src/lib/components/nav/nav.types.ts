import { SVGS } from '$lib/components';

/** Details for a nav item */
export interface NavItemConfig {
	/**Icon to render  */
	svg: keyof typeof SVGS;
	/**Text to render */
	text: string;
	/**HREF associated with nav item */
	href: string;
	/**ID of section associated with nav item */
	sectionId?: string;
}
