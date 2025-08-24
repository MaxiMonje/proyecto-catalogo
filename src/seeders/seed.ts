import sequelize from "../utils/databaseService";
import seedUsers from "./userSeeder";
import seedRoles from "./roleSeeder";
import seedForm from "./formSeeder";
import seedPayment from "./paymentSeeder";
import seedImage from "./imageSeeder";


const seed = async () => {
  try {
    await sequelize.sync({ force: true }); // Limpia y vuelve a crear las tablas
    await seedRoles();
    await seedUsers();
    await seedPayment();
    await seedForm();
    await seedImage();
   
    console.log("✅ Seed completado exitosamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al ejecutar seed:", error);
    process.exit(1);
  }
};

seed();