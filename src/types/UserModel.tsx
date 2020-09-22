export const UserModel = {
  jwt: String,
  user: {
    blocked: Boolean,
    confirmed: Boolean,
    created_at: String,
    created_by: String,
    email: String,
    id: Number,
    phone: String,
    provider: String,
    role: {
      created_by: String,
      description: String,
      id: String,
      name: String,
      type: String,
      updated_by: String,
    },
    updated_at: String,
    updated_by: String,
    username: String,
  },
};
