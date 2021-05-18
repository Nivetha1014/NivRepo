const express = require('express');
const router = express.Router();
const Contact = require('../models/contact')

router.get('/contact',(req,res,next)=>{
    console.log("Retrieving the contact list");
    Contact.find((err,contacts)=>{
        res.json(contacts);
    })
})

router.post('/contact',(req,res,next)=>{
    console.log("adding the contact list");
    let newContact = new Contact({
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        phone : req.body.phone
    })
    newContact.save((err,contact)=>{
        if(err)
        res.json({msg:"failed to tore conntact"});
        else
        res.json({msg:"contacts added"})
    })
})

router.delete('/contact/:id',(req,res,next)=>{
    console.log("Deleting the contact list");
    Contact.remove({_id:req.params.id},(err,result)=>{
        if(err)
        res.json(err);
        else
        res.json(result);
    })
})

module.exports = router;