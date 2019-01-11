export class Items {
    constructor(
		public _id: String,
		public item_type: String,
		public render_type: String,
		public name: String,
		public image_url: String,
		public writeup: String,
		public description: String,
		public featured: Boolean,
		public location: String,
		public phone_num: String[],
		public rockwellist_picks: Array<any>,
		public similar_items: Array<any>
	) { }
  }
  