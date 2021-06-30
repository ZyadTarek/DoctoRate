import { Injectable } from '@angular/core';
import { Specialization } from '../_models/specialization';

@Injectable({
  providedIn: 'root'
})
export class SpecializationService {

  constructor() { }

  specializations:Specialization[]=
  [
    {id:0 , spec_name_ar:"كل التخصصات" , spec_name_en:"none"},
    {id:1 , spec_name_ar:"باطنة" , spec_name_en:"Internist"},
    {id:2 , spec_name_ar:"قلب" , spec_name_en:"Cardiologist"},
    {id:3 , spec_name_ar:"عيون" , spec_name_en:"Ophthalmologist"},
    {id:4 , spec_name_ar:"تغذية" , spec_name_en:"Nutrition"},
    {id:5 , spec_name_ar:"جلدية" , spec_name_en:"Dermatologist"},
    {id:6 , spec_name_ar:"تجميل" , spec_name_en:"Plastic Surgeon"},
    {id:7 , spec_name_ar:"نفسية و عصبية" , spec_name_en:"Psychiatrist / Neurologist"},
    {id:8 , spec_name_ar:"أمراض الدم / الأورام" , spec_name_en:"Hematologist / Oncologist"},
    

    {id:9 , spec_name_ar:"انف و اذن" , spec_name_en:"Otolaryngologist"},
    {id:10 , spec_name_ar:"نسا و ولادة" , spec_name_en:"Obstetrician / Gynecologist"},
    {id:11, spec_name_ar:"اطفال" , spec_name_en:"Pediatrician"},
    {id:12 , spec_name_ar:"الحساسية / المناعة" , spec_name_en:"Allergist or Immunologist"},
    
  ]

  getSpecialization()
  {
    return this.specializations;
  }
}
