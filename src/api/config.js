const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // Use HTTPS for production
  return 'https://tihnthwonf.execute-api.ap-south-1.amazonaws.com';
};

export const endpoints = {
  signup: `https://tihnthwonf.execute-api.ap-south-1.amazonaws.com/prod/api/signup`,
  signin: `https://tihnthwonf.execute-api.ap-south-1.amazonaws.com/prod/api/signin`,
};

export default endpoints; 