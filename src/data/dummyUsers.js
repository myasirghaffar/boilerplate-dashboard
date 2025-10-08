// Dummy user data for authentication
export const dummyUsers = [
  {
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    name: "Admin User",
    route: "admin",
  },
  {
    email: "user@example.com",
    password: "user123",
    role: "user",
    name: "Regular User",
    route: "user",
  },
  {
    email: "contractor@example.com",
    password: "contractor123",
    role: "contractor",
    name: "Contractor User",
    route: "contractor",
  },
];

// Function to authenticate user
export const authenticateUser = (email, password) => {
  const user = dummyUsers.find(
    (user) => user.email === email && user.password === password
  );
  return user || null;
};
