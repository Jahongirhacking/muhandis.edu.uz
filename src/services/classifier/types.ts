import {
  ApplicationSubmitAsChoice,
  ApplicationTypeChoice,
  ExampleFileFieldNameChoices,
} from "../types";

export interface IAdmission {
  id: number;
  name: string;
  start_at: string;
  end_at: string;
  visibility_start_at: string;
  visibility_end_at: string;
  is_announced: boolean;
  applicant_can_modify_until: string;
  is_visible: boolean;
  is_active: boolean;
}

export interface IExampleFile {
  id: number;
  field_name: ExampleFileFieldNameChoices;
  file: string;
  file_type: ApplicationTypeChoice;
  for_idea: boolean;
  for_project: boolean;
  for_invention: boolean;
}

export interface IMipRegion {
  id: number;
  code: string;
  name_uz: string;
  name_en: string;
  name_ru: string;
}

export interface IStat {
  submit_as: ApplicationSubmitAsChoice;
  idea_count: number;
  project_count: number;
  invention_count: number;
}

export interface ISearchQuery {
  limit?: number;
  offset?: number;
  q?: string;
  region_id?: number;
}

export interface ISearchResult<T> {
  count: number;
  results: T[];
}
