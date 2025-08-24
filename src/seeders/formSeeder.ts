import { Form, FormCreationAttributes } from "../models/Form";

const seedForm = async () => {
  const data: FormCreationAttributes[] = [
    { userId: 1, title: "Contact Form", active: true },
    { userId: 1, title: "Onboarding Survey", active: true },
    { userId: 2, title: "Feedback 2025", active: true },
    { userId: 3, title: "Bug Report", active: true },
    { userId: 3, title: "Feature Request", active: true },
  ];

  await Form.bulkCreate(data, { validate: true /*, individualHooks: true */ });
};

export default seedForm;
