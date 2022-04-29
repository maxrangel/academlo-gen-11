const { app } = require('./app');

// Models
const { Post } = require('./models/post.model');
const { User } = require('./models/user.model');

// Utils
const { db } = require('./utils/database');

// Authenticate database credentials
db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

// Establish models relations

// 1 User <----> M Post
// User.hasMany(Post, { foreignKey: 'userId' });
User.hasMany(Post);
Post.belongsTo(User);

// Sync sequelize models
db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

// Spin up server
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
