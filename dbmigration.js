import sequelize from './db.js';

const updateDb = async () => {
    try {
        await sequelize.sync(); // This creates the tables if they don't exist
        // await sequelize.sync({ alter: true }); // This will update existing tables
        console.log('Database synced');
    } catch (error) {
        console.error('Unable to sync the database:', error);
    } finally {
        await sequelize.close();
    }
};


export default updateDb;
