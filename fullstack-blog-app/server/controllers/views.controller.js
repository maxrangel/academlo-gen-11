const path = require('path');

// ..\public\index.html --> relative path
// D:\Development\academlo\gen-11\fullstack-blog-app\server\public\index.html --> absolute path
const renderIndex = (req, res) => {
  const indexPath = path.join(__dirname, '..', 'public', 'index.html');

  res.status(200).sendFile(indexPath);
};

module.exports = { renderIndex };
