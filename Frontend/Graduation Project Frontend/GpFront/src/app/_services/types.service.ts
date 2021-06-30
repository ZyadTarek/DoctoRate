import { Injectable } from '@angular/core';
import {Type} from '../_models/type'

@Injectable({
  providedIn: 'root'
})
export class TypesService {

  constructor() { }

  types: Type[] = [
    {type_id: 0, type_name: 'none' , type_name_ar:"كل التخصصات" ,img_src: null},
    {type_id: 1, type_name: 'Doctor'  , type_name_ar: "طبيب" ,img_src: "home/doctor.webp"},
    {type_id: 2, type_name: 'Hospital'   , type_name_ar: "مستشفى" ,img_src: "home/hospital.webp"},
    {type_id: 3, type_name: 'pharmacy'  , type_name_ar: "صيدلية"  ,img_src: "home/pharmacy.webp"},
    {type_id: 4, type_name: 'Laboratory'  , type_name_ar: "معمل تحاليل" ,img_src: "home/others.webp"},
    {type_id: 5, type_name: 'Radiology center'  , type_name_ar: "مركز اشعة" ,img_src: "home/others.webp"},

    {type_id: 6, type_name: 'dentist'  , type_name_ar: "اسنان" ,img_src: "home/dentist.webp"},
    {type_id: 7, type_name: 'physiotherapist'  , type_name_ar: "علاج طبيعي" ,img_src: "home/physical therapy.webp"}
  ];

  getTypes(){
    return this.types;
  }

  typesForAdmin: Type[] = [
    {type_id: 0, type_name: 'none' , type_name_ar:"كل التخصصات" ,img_src: null},
    {type_id: 1, type_name: 'Doctor'  , type_name_ar: "طبيب" ,img_src: "home/doctor.webp"},
    {type_id: 2, type_name: 'Hospital'   , type_name_ar: "مستشفى" ,img_src: "home/hospital.webp"},
    {type_id: 3, type_name: 'pharmacy'  , type_name_ar: "صيدلية"  ,img_src: "home/pharmacy.webp"},
    {type_id: 4, type_name: 'Laboratory and Radiology center'  , type_name_ar: " معمل تحاليل و مركز اشعة" ,img_src: "home/others.webp"},

    {type_id: 6, type_name: 'dentist'  , type_name_ar: "اسنان" ,img_src: "home/dentist.webp"},
    {type_id: 7, type_name: 'physiotherapist'  , type_name_ar: "علاج طبيعي" ,img_src: "home/physical therapy.webp"}
  ];

  getTypesForAdmin(){
    return this.typesForAdmin;
  }
}
