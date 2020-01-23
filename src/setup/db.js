import mongoose from "mongoose";

const { DB } = process.env;

export default async () => {
  try {
    await mongoose.connect(`${DB}`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    });
    console.info('INFO - Database connected.')
  } catch (err) {
    console.error('ERROR - Unable to connect to the database:', err)
  }
};
