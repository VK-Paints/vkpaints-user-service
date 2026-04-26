const app = require('./src/app');
const { connectDB } = require('./src/config/db');
const User = require('./src/models/user.model');
const bcrypt = require('bcryptjs');

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // 1. Connect and Sync Database
    await connectDB();

    // 2. Seed Default Admin if needed
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    
    if (adminEmail && adminPassword) {
      const adminExists = await User.findOne({ where: { email: adminEmail } });
      if (!adminExists) {
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        await User.create({ 
          name: 'System Admin', 
          email: adminEmail, 
          password: hashedPassword, 
          role: 'Admin' 
        });
        console.log('👑 Default Admin user created from ENV variables.');
      }
    }

    // 3. Start Listening
    app.listen(PORT, () => {
      console.log(`🚀 User Service running on port ${PORT}`);
    });
  } catch (err) {
    console.error('❌ Server startup failed:', err.message);
    setTimeout(startServer, 5000); // Retry logic
  }
};

startServer();
