export class EGC {
    constructor(
        public amount: Number,
        public claimed: Boolean,
        public created_date: Date,
        public expiration_date: Date,
        public name: String,
        public tracking_id: String,
        public qr_code: String
	) { }
  }
  