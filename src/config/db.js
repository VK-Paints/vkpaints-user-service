const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_URL || 'postgres://postgres:postgres@localhost:5432/user_db',
  {
    logging: false,
    dialect: 'postgres'
  }
);

const connectDB = async (sync = true) => {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to PostgreSQL');
    
    if (sync) {
      await sequelize.sync({ alter: true });
      console.log('✅ Database Synced');
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
