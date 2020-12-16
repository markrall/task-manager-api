declare const sendWelcomeEmail: (email: string, name: string) => Promise<void>;
declare const sendCancellationEmail: (email: string, name: string) => Promise<void>;
export { sendWelcomeEmail, sendCancellationEmail, };
