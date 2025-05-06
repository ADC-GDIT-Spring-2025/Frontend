export type EmailType = {
    subject: string;
    body: string;
    to: string;
    from: string;
    date: string;
    cc?: string; // Optional field
    bcc?: string; // Optional field
};


export type ChatMessageType = {
role: "user" | "assistant";
message: string;
};