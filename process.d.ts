declare namespace NodeJS {
  export interface ProcessEnv {
    DATABASE_URL?: string;
    NEXTAUTH_URL?: string;
    NEXTAUTH_SECRET?: string;
    EMAIL_CONTACTS?: string;
    GMAIL_USER?: string;
    GMAIL_PASS?: string;
    GMAIL_SENDER?: string;
  }
}
