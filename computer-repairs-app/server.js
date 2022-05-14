const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Repair } = require('./models/repair.model');

// Utils
const { db } = require('./utils/database');

// Authenticate db credentials
db.authenticate()
	.then(() => console.log('Database authenticated'))
	.catch(err => console.log(err));

// Establish models relations
User.hasMany(Repair);
Repair.belongsTo(User);

db.sync()
	.then(() => console.log('Database synced'))
	.catch(err => console.log(err));

const PORT = 4000;
app.listen(PORT, () => {
	console.log(`Express app running on port ${PORT}`);
});
