const mongoose = require('mongoose');

async function dropIndex() {
  try {
    await mongoose.connect('mongodb+srv://root:root@social-media.fapvw1i.mongodb.net/Social-Media?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected")
    await mongoose.connection.db.collection('likes').dropIndex('post_1_user_1');
    
    console.log('Index dropped successfully!');
  } catch (error) {
    console.error('Error dropping index:', error);
  } finally {
    mongoose.disconnect();
  }
}

dropIndex();
