// src/services/types.ts
export interface Post {
  id: number;
  title: string;
  body: string;
}

export enum Role {
  Applicant = "applicant",
  Expert = "expert",
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
  REJECTED = 10,
  PLACE_1 = 11,
  PLACE_2 = 12,
  PLACE_3 = 13,
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

export const getApplicationStatusName = (value: ApplicationStatusChoice) => {
  switch (value) {
    case ApplicationStatusChoice.CREATED:
      return "Qoralama (Ariza yuborilmagan)";
    case ApplicationStatusChoice.SENT:
      return "Yuborilgan";
    case ApplicationStatusChoice.PASSED:
      return "Texnik ekspertizadan o'tgan";
    case ApplicationStatusChoice.EVALUATED:
      return "Komissiya kotibi baholagan";
    case ApplicationStatusChoice.SELECTED:
      return "Baholanganlarni ichidan tanlangan (10 nafardan)";
    case ApplicationStatusChoice.REJECTED:
      return "Texnik ekspertizadan qaytgan";
    case ApplicationStatusChoice.PLACE_1:
      return "1-o'rin";
    case ApplicationStatusChoice.PLACE_2:
      return "2-o'rin";
    case ApplicationStatusChoice.PLACE_3:
      return "3-o'rin";
  }
};

export const getApplicationChoiceName = (
  value: ApplicationTypeChoice | "none"
) => {
  switch (value) {
    case ApplicationTypeChoice.Idea:
      return "G‘oya";
    case ApplicationTypeChoice.Project:
      return "Loyiha";
    case ApplicationTypeChoice.Invention:
      return "Ixtiro";
    default:
      return "Topilmadi";
  }
};

export const getErrorMessage = (text: string): string => {
  if (text.includes("Modify time is out"))
    return "O'zgartirish vaqti tugadi. Qabul qilishni tekshiring";
  if (text.includes("can't select workplace in this application"))
    return "Bu ariza holatida ish joyini tanlay olmaysiz";
  if (text.includes("workplace not found in HEMIS"))
    return "Bu ariza holatida ish joyini tanlay olmaysiz";
  if (text.includes("need to select a workplace"))
    return "Siz ish joyini tanlashingiz kerak";
  if (text.includes("Max age"))
    return "Ariza yuborish uchun chegara 40 yoshgacha etib belgilangan";
  if (text.includes("can send only created or rejected applications")) {
    return "Siz faqat yaratilgan yoki rad etilgan arizalarni yubora olasiz";
  }
  return text;
};

export const getRoleName = (role: ApplicationSubmitAsChoice) => {
  switch (role) {
    case ApplicationSubmitAsChoice.STUDENT:
      return "Talaba";
    case ApplicationSubmitAsChoice.PRACTICAL_ENGINEER:
      return "Amaliyotchi muhandis";
    case ApplicationSubmitAsChoice.PROFESSOR_TEACHER:
      return "Professor-o‘qituvchi";
    default:
      return "Topilmadi";
  }
};
