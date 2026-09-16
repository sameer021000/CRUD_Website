export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const usernameRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,15}$/;

export const checkPasswordCriteria = (pwd) => {
  return {
    uppercase: /[A-Z]/.test(pwd),
    lowercase: /[a-z]/.test(pwd),
    number: /[0-9]/.test(pwd),
    specialChar: /[^A-Za-z0-9]/.test(pwd),
    length: pwd.length >= 8 && pwd.length <= 15
  };
};

export const formatPhoneNumber = (value) => {
  return value.replace(/\D/g, '').slice(0, 10);
};
