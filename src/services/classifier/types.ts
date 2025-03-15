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
