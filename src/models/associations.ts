import { User } from "./User";
import { Role } from "./Role";
import { Payment } from "./Payment";
import { Form } from "./Form";
import { Image } from "./Image";

export const setupAssociations = () => { 

     // User - Role
  Role.hasMany(User, { foreignKey: "roleId", as: "users" });
  User.belongsTo(Role, { foreignKey: "roleId", as: "role" });

   // User - Payment 
  User.hasMany(Payment, { foreignKey: "userId", as: "payments" });
  Payment.belongsTo(User, { foreignKey: "userId", as: "user" });

  // User - Form
  User.hasMany(Form, { foreignKey: "userId", as: "forms" });
  Form.belongsTo(User, { foreignKey: "userId", as: "user" });

  // Form - Image 
  Form.hasMany(Image, { foreignKey: "formId", as: "images" });
  Image.belongsTo(Form, { foreignKey: "formId", as: "form" });
  
};