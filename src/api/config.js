const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // Use HTTPS for production
  return 'https://dwlrpga2kd.execute-api.ap-south-1.amazonaws.com';
};

export const endpoints = {
  signup: `https://uut8pa1v3f.execute-api.ap-south-1.amazonaws.com/prod/api/signup`,
  signin: `https://uut8pa1v3f.execute-api.ap-south-1.amazonaws.com/prod/api/signin`,
};

export default endpoints; 