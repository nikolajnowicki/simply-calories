"use server";

import prisma from "@/app/lib/prisma";
import bcrypt from "bcrypt";

export const signUp = async (
  username: string,
  password: string,
  email: string
) => {
  const normalizedUsername = username.toLowerCase();
  const normalizedEmail = email.toLowerCase();

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username: normalizedUsername }, { email: normalizedEmail }],
    },
  });

  if (existingUser) {
    if (existingUser.username === normalizedUsername) {
      return "A user with that username already exists.";
    }
    if (existingUser.email === normalizedEmail) {
      return "A user with that email already exists.";
    }
  }

  const passwordHash = bcrypt.hashSync(password, 10);

  await prisma.user.create({
    data: {
      username: normalizedUsername,
      passwordHash,
      email: normalizedEmail,
    },
  });

  return "Successfully created a new user";
};
