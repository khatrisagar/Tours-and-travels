import bcrypt from "bcrypt";

const encryptPassword = async (password: string) => {
  const encryptedPassword = bcrypt.hash(password, 10);
  return encryptedPassword;
};

const verifyPassword = async (password: string, encryptedPass: string) => {
  const isAuthenticated = await bcrypt.compare(password, encryptedPass);
  return isAuthenticated;
};

export { encryptPassword, verifyPassword };
