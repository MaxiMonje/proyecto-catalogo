import { Payment, PaymentCreationAttributes } from "../models/Payment";

const seedPayment = async () => {
  const data: PaymentCreationAttributes[] = [
    {
      userId: 1,
      datePayments: "2025-08-01",
      endDatePayments: "2025-08-31",
      price: 199.99,
      active: true,
    },
    {
      userId: 2,
      datePayments: "2025-07-15",
      endDatePayments: "2025-08-14",
      price: 49.0,
      active: true,
    },
    {
      userId: 1,
      datePayments: "2025-06-01",
      endDatePayments: "2025-06-30",
      price: 20.5,
      active: true,
    },
    {
      userId: 3,
      datePayments: "2025-05-10",
      endDatePayments: "2025-06-09",
      price: 9.99,
      active: true,
    },
    {
      userId: 2,
      datePayments: "2025-04-01",
      endDatePayments: "2025-04-30",
      price: 120.0,
      active: true,
    },
  ];

  await Payment.bulkCreate(data, { validate: true /*, individualHooks: true */ });
};

export default seedPayment;
