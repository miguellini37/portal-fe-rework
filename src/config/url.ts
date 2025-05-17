const appRunner_url = 'https://pujdfbzyav.us-east-2.awsapprunner.com';

// USE localhost OR amazon app runner url ACCORDING TO ENVIRONMENT
export const url = process.env.REACT_APP_LOCAL_BACKEND_URL ?? appRunner_url;
