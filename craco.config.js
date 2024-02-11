const path = require('path');
module.exports = {
  webpack: {
    alias: {
      '@/chat': path.resolve(__dirname, 'src/apps/chat'),
      '@/firebase': path.resolve(__dirname, 'src/firebase'),
    },
  },
};
