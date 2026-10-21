export interface EnquiryResponse {
  status: "handoff" | "submitted" | "error";
  message: string;
  whatsappUrl: string | null;
  fieldErrors?: Record<string, string>;
}
