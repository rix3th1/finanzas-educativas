import pkg from "@/../package.json";

// Human-readable title for your website
export const rpName = pkg.description;
// A unique identifier for your website
export const rpID = new URL(process.env.NEXTAUTH_URL!).hostname;
// The URL at which registrations and authentications should occur
export const origin = `https://${rpID}`;
