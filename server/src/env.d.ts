declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: string;
    MONGO_URI: string;
    SESSION_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    BRAINTREE_MERCHANT_ID: string;
    BRAINTREE_PUBLIC_KEY: string;
    BRAINTREE_PRIVATE_KEY: string;
    CLIENT_BASE_URL: string;
    SENDGRID_API_KEY: string;
    PERSONAL_EMAIL: string;
  }
}
