// src/services/types.ts
export interface Post {
  id: number;
  title: string;
  body: string;
}

export enum Role {
  Applicant = "applicant",
  Inspector = "inspector",
  Ministry = "ministry",
}

export enum Gender {
  Male = 1,
  Female = 2,
}

export enum InspectorRoleChoice {
  None = 0,
  TechnicalExpert = 1,
  WorkingGroup = 2,
  Comission = 3,
}

export enum InspectorTypeChoice {
  None = "none",
  Idea = "idea",
  Project = "project",
  Invention = "invention",
}

export enum ApplicationStatusChoice {
  CREATED = 0,
  SENT = 1,
  PASSED = 2,
  EVALUATED = 3,
  SELECTED = 4,
  WON = 5,
  REJECTED = 10,
}

export enum ApplicationTypeChoice {
  Idea = "idea",
  Project = "project",
  Invention = "invention",
}

export enum ApplicationSubmitAsChoice {
  STUDENT = "student",
  PROFESSOR_TEACHER = "professor_teacher",
  PRACTICAL_ENGINEER = "practical_engineer",
}

export enum ExampleFileFieldNameChoices {
  APPEAL_FILE = "appeal_file",
  TABLE1_FILE = "table1_file",
  TABLE2_FILE = "table2_file",
  TABLE2_1_FILE = "table2_1_file",
  TABLE2_2_FILE = "table2_2_file",
  TABLE3_FILE = "table3_file",
  PRESENTATION_FILE = "presentation_file",
  VIDEO_CLIP_FILE = "video_clip_file",
  CALENDAR_PLAN_FILE = "calendar_plan_file",
  TECHNICAL_DOCUMENT_FILE = "technical_document_file",
  EXPERT_CONCLUSION_FILE = "expert_conclusion_file",
  INDICATOR_METRIC_FILE = "indicator_metric_file",
  FOREIGN_PASSPORT_FILE = "foreign_passport_file",
}
