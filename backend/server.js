const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

  const infoSchema = new mongoose.Schema({
    country:String,
    capital:String

  },{ versionKey: false });


const User = mongoose.model('countries', infoSchema);

const app = express();

app.use(cors({
  origin: 'http://localhost:3000', 
}));
// app.use(bodyparser.json());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

app.get('/', async (req, res) => {
  try {
    const data = await User.find();
    res.json(data);
    // console.log(data)
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error fetching data' });
  }
});

app.post('/',async (req,res)=>{
  try{
    const data= new User({
    country: req.body.country,
    capital: req.body.capital,
  })
  const result=await data.save();
  res.send(result)
  }catch(err){
    console.log(err)
    res.status(500).json({ error: 'Error posting data' });
  }
  
})
app.delete('/:id',async (req,res)=>{
  const result= await User.deleteOne({_id:req.params.id})
  res.send(result)
})

app.get('/:id', async(req,res)=>{
  try{
    const result= await User.findOne({_id:req.params.id})
    if(result){
      res.send(result)
    }else{
      res.send({message:"No reord found"})
    }
    
  }catch(err){
    res.status(500).json(err);
  }
})

app.put('/:id', async(req,res)=>{
  let result = await User.updateOne(
    {_id:req.params.id},
    {
      $set: req.body
    }
  )
  res.send(result)
})


app.listen(2000, () => {
  console.log("Server is running on port 2000");
})