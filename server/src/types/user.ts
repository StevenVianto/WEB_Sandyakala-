export type Roles = {
  USER: "USER";
  UMKM: "UMKM";
  ADMIN: "ADMIN";
};

export type TokenPayload = {
  id: number;
  email: string;
  role: Roles[keyof Roles];
};
