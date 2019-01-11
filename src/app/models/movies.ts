export class Movies {
    constructor(
    public _id: String,
    public item_type: String,
    public render_type: String,
    public name: String,
    public image_url: String,
    public writeup: String,
    public description:String,
    public trailer_url: String,
    public genre: String,
    public mtrcb_rating: String,
    public booking_url: String,
    public thumbnail_url: String,
    public availability: Array<Availability>) { }
  }

  export class Availability{
    constructor(
      public theater_name: String,
      public opening_date: String,
      public end_date: String 
    ){}
  }
  