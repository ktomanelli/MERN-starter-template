import * as dotenv from 'dotenv';
import bs58 from "bs58";
dotenv.config();

export const oAuthClientId = process.env.NOTION_OAUTH_CLIENT_ID || '';
export const oAuthClientSecret = process.env.NOTION_OAUTH_CLIENT_SECRET || '';
export const oAuthRedirectUri = process.env.NOTION_OAUTH_REDIRECT_URI || '';
export const mongoConnectionString = process.env.MONGO_CONNECTION_STRING || ''; 
export const jwtSecret = process.env.JWT_SECRET || ''; 
export const frontendUrl = 'https://dev.notiontools.dev';