const fs = require('fs')
const mongooes = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModels');



dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongooes
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection successfull'));

  //READ JSON FILE
  const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`,'utf-8'));

  //IMPORT DATA INTO DB
  const importData = async()=>{
    try{
        await Tour.create(tours);
        console.log('Data successfully loaded!')
        process.exit();
    }catch (err){
        console.log(err)
    }
  }

  //DELETE ALL DATA FROM DB
  const deleteData = async ()=>{
    try{
        await Tour.deleteMany();
        console.log('Data successfully deleted!')
        process.exit();
    }catch(err) {
        console.log(err)
    }
  }


  if(process.argv[2] === '--import'){
    importData();
  }else if(process.argv[2]== '--delete'){
    deleteData();
  }
  console.log(process.argv)