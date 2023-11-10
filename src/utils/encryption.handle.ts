import { hash, compare } from "bcryptjs";

const encrypt = async (text: string, secureLevel = 10) => {
  const hashedText = await hash(text, secureLevel);
  return hashedText;
};

const verify = async (text: string, hashedText: string) => {
  const isCorrect = await compare(text, hashedText);
  return isCorrect;
};

export { encrypt, verify };
