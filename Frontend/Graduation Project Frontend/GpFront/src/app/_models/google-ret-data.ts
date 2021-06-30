import { PlaceFeatures } from "./place-features";

export class GoogleRetData {
    constructor(public results:PlaceFeatures[] , public next_page_token) {}
}
