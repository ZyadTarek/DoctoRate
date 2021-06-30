import { Component, OnInit } from '@angular/core';
import { Offer } from '../_models/offer';
import { PlaceFeatures } from '../_models/place-features';
import { OfferService } from '../_services/offer.service';
import { TypesService } from '../_services/types.service';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  constructor(
    private OfferSer : OfferService,
    private typeSer:TypesService
  ) { }

  offers:Offer[] ;
  ngOnInit(): void {
    this.OfferSer.getAllOffer().subscribe(a=>
      {
        //this.offers = a; 

        a.forEach(item =>
          {
            item.img_src= "../../assets/img/"+ this.typeSer.getTypes().find(a=>a.type_id==item.type).img_src;
          });
        this.offers = a; 

      });
  }


  

  
  

  

}
