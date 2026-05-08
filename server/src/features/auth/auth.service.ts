import { AuthRepository } from "./auth.repository.js";

export const AuthService = {
  login: async (email: string) => {
    return `Logged in with email: ${email}`;
  },

  async getAllUsers() {
    return await AuthRepository.findAll();
  },
};
