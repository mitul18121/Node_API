import jwt from "jsonwebtoken";

export const verifyUser = async (token) => {
  let decoded1 = jwt.verify(token, process.env.SECRET);
  return decoded1;
};
