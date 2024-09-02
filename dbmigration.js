import sequelize from './db';
import { Transaction, User } from './models/models.js';

const updateDb = (async () => {
    try {
        await sequelize.sync(); // This creates the tables if they don't exist
        console.log('Database synced');
    } catch (error) {
        console.error('Unable to sync the database:', error);
    } finally {
        await sequelize.close();
    }
})();


export default updateDb;
