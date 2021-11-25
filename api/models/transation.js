const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    from:{
        type : String,
        require : true
    },
    to:{
        type : String,
        require : true
    },
    amount:{
        type : String,
        require : true
    },
    receipt:{
        type : Array,
        require : true
    }},
    {
        timestamps:true
    },
);

module.exports = mongoose.model('Transaction', transactionSchema)