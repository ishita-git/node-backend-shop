const express = require('express')
const router = express.Router()

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message: 'Orders were fetched!'
    })
})

router.post('/',(req,res,next)=>{
    const order = {
        productId: req.body.productId,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: 'Order was created!',
        order: order
    })
})

router.get('/:productId',(req,res,next)=>{
    res.status(200).json({
        message: 'Orders details',
        orderId : req.params.orderId
    })
})
router.delete('/:productId',(req,res,next)=>{
    res.status(200).json({
        message: 'Orders deleted',
        orderId : req.params.orderId
    })
})

module.exports = router