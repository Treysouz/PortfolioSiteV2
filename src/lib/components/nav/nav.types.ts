import { SVGS } from '$lib/components';

/** Orientation of nav item */
export type NavItemOrientation = 'horizontal' | 'vertical';

/** What varient of nav to render */
export type NavVarient = 'mobile' | 'desktop';

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
