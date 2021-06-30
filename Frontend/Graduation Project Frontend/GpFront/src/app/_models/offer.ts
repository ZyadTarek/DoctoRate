export class Offer {

    constructor(
        public comment ?: string,
        public expired_date ?: string,
        public offer_percent ?: number,
        public place_id ?: string,
        public place_name ?: string,
        public rate ?: number,
        public type ?: number,
        public img_src ?: string,
        public id?:number
    ){}

}
