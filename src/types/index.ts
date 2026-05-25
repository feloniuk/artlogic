export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service: string | null;
  message: string;
  isRead: boolean;
  locale: string;
  createdAt: string;
  updatedAt: string;
}

export type Locale = "uk" | "en";
