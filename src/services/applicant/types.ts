import {
  ApplicationStatusChoice,
  ApplicationSubmitAsChoice,
  ApplicationTypeChoice,
} from "../types";
import { IUser } from "../user/types";

export interface IUniversity {
  id: number;
  code: string;
  name_uz: string;
  name_en: string;
  name_ru: string;
  is_military: boolean;
  region: number;
}

export interface IStudent {
  id: number;
  admission: number;
  university: IUniversity;
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

export interface IApplication {
  id: number;
  user: IUser["id"];
  admission: number;
  application_type: ApplicationTypeChoice;
  submit_as: ApplicationSubmitAsChoice;
  status: ApplicationStatusChoice;
  rejected_reason: string;
  expert_conclusion: object;
  completeness_grade: number;
  conceptual_grade: number;
  relevance_grade: number;
  funds_calculated_grade: number;
  effectiveness_grade: number;
  competitiveness_grade: number;
  commission_final_grade: number;
  name: string;
  category: string;
  short_description: string;
  problem_and_solution: string;
  appeal_file: string | null;
  table1_file: string | null;
  table2_file: string | null;
  table2_1_file: string | null;
  table2_2_file: string | null;
  table3_file: string | null;
  presentation_file: string | null;
  video_clip_file: string | null;
  calendar_plan_file: string | null;
  technical_document_file: string | null;
  expert_conclusion_file: string | null;
  indicator_metric_file: string | null;
  foreign_passport_file: string | null;
  from_military: boolean;
}

export type IBasicApplication = Pick<
  IApplication,
  | "id"
  | "user"
  | "admission"
  | "application_type"
  | "submit_as"
  | "name"
  | "category"
  | "short_description"
  | "problem_and_solution"
>;

export interface IMilitary {
  id: number;
  user: number;
  admission: number;
  university: number;
  source_file: string;
}

export interface IMilitaryInfo extends Omit<IMilitary, "user" | "university"> {
  university: IUniversity;
}

export interface IDoctorate {
  id: number;
  admission: number;
  organization_id: number;
  organization_name: string;
  course: number;
  admission_year: number;
  doctorate_type: string;
  direction: string;
  scientific_work_name: string;
}

export const getGlobalName = (value: {
  name_uz?: string;
  name_en?: string;
  name_ru?: string;
}) => {
  return value?.name_uz || value?.name_en || value?.name_ru || "";
};
