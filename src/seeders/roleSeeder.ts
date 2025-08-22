import { Role } from "../models/Role";

const seedRole = async () => {
  await Role.bulkCreate([
    { role: "Admin", active: true },
    { role: "User", active: true },
    { role: "Client", active: true }
  ]);
};

export default seedRole;