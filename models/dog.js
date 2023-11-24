const mongoose=require('mongoose');

const dogSchema=new mongoose.Schema({
    name: {
        type: String,
        validate: {
          validator: function (value) {
            return /^[a-zA-Z]+$/.test(value);
          },
          message: 'Name should contain only alphabets'
        },
        required: [true, 'Name is required']
      },
      age: {
        type: Number,
        min: [1, 'Age must be at least 1 year'],
        max: [20, 'Age cannot exceed 20 years'],
        required: [true, 'Age is required']
      },
    breed: String});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
