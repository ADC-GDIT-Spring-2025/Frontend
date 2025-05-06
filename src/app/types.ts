export type EmailType = {
  subject: string;
  body: string;
  to: string[];
  from: string;
  time: string;
  cc: string[];
  bcc: string[];
};

export type ChatMessageType = {
  role: "user" | "assistant";
  message: string;
};
