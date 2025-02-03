import bcrypt from "bcryptjs";

export async function hashPassword(toResgisterPassword) {
  return await bcrypt.hash(toResgisterPassword, 10); // 10 is salt rounds
}

export async function comparePassword(inputPassword, hashedPassword) {
  return await bcrypt.compare(inputPassword, hashedPassword);
}
