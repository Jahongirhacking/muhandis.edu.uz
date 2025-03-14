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
