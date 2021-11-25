const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Transaction = require('../models/transation');

const TronWeb = require('tronweb');

const HttpProvider = TronWeb.providers.HttpProvider;

const fullNode = new HttpProvider(process.env.HOST)

const solidityNode = new HttpProvider(process.env.HOST)

const eventServer = process.env.HOST;

const privateKey = process.env.privateKey;

const tronWeb = new TronWeb(fullNode, solidityNode, eventServer, privateKey);

router.post('/transaction', async(req, res, next) => {

    const { from, to, amount } = req.body;
    try {
        const tradeobj = await tronWeb.transactionBuilder.sendTrx(to, amount, from);
        const signedtxn = await tronWeb.trx.sign(tradeobj);
        const receipt = await tronWeb.trx.sendRawTransaction(signedtxn);

        const transaction = new Transaction({
            _id : new mongoose.Types.ObjectId,
            from : req.body.from,
            to : req.body.to,
            amount : req.body.amount,
            receipt: receipt
        })
        try {
            const t1 = transaction.save()
            res.status(200).json({
                Message : 'transaction success!',
                transaction,
            }) 
        } catch (error) {
            res.status(404).json({
                Message :'Unable transaction :',
                error
            })
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({
            message : 'Transaction failed!',
            address
        })
    } 
});



module.exports = router;