import dotenv from 'dotenv';

dotenv.config({ path: './src/environments/.env' });

export default dotenv;

export const { MONGODB_URL } = process.env;

export const { PORT } = process.env;

export const { SECRET_KEY } = process.env;
