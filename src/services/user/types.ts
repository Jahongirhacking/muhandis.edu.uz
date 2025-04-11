import {
  IMilitary,
  IStudent,
  IUniversity,
  IWorkplace,
} from "../applicant/types";
import { IMipRegion } from "../classifier/types";
import {
  ApplicationTypeChoice,
  Gender,
  InspectorRoleChoice,
  InspectorTypeChoice,
  Role,
} from "../types";

export interface IUser {
  id: number;
  role: Role;
  check_type?: ApplicationTypeChoice;
  pinfl: string;
  document: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  gender: Gender;
  birth_date: string;
  phone_number: string;
  email: string;
  mip_district: {
    id: number;
    code: string;
    name_uz: string;
    name_en: string;
    name_ru: string;
  };
  mip_region: {
    id: number;
    code: string;
    name_uz: string;
    name_en: string;
    name_ru: string;
  };
  mip_address: string;
  inspector_type: InspectorTypeChoice;
  inspector_role: InspectorRoleChoice;
  students?: IStudent[];
  workplaces?: IWorkplace[];
  militaries?: (Omit<IMilitary, "university"> & { university: IUniversity })[];
  mip_region_data?: IMipRegion;
  mip_district_data?: IMipRegion;
}

export interface IPhoto {
  photo: string;
}
