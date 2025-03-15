export interface IStudent {
  id: number;
  admission: number;
  university: {
    id: number;
    code: string;
    name_uz: string;
    name_en: string;
    name_ru: string;
    region: number;
  };
  faculty: string;
  speciality: string;
  education_type: string;
  education_form: string;
  education_language: string;
  course: number;
  education_year: number;
}

export interface IMessage {
  success: boolean;
  message: string;
}

export interface IWorkplace {
  id: number;
  admission: number;
  organization: string;
  organization_tin: string;
  department: string;
  position: string;
  rate: string;
  begin_date: string;
  is_selected: boolean;
  exists_in_hemis: boolean;
}
