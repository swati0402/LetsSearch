let { customers }= require('../data/data.js');
let customer = require('../models/customer.js');

//Get All customers of an agent
  const getCustomersByAgentId= (req, res) => {
    const { id } = req.params
    const person = customers.find((person) => person.agent_id === Number(id))
    
    if (!person) {
      return res
        .status(404)
        .json({ success: false, msg: `no customer for this agent ${id}` })
    }
    const allcustomers = customers.filter((allcustomers) => allcustomers.agent_id === Number(id))
    res.status(200).json({ success: true, data: allcustomers })
  }

  //Get All customerdata by customerid
  const getCustomerdataById= (req, res) => {
    const { id ,cid} = req.params
    const persons = customers.find((person) => person.agent_id === Number(id))
    if (!persons) {
      return res
        .status(404)
        .json({ success: false, msg: `no agent with id ${id}` })
    }
    const customer = customers.find((person) => person.agent_id === Number(id) && person._id === Number(cid) )
    if (!customer) {
        return res
          .status(404)
          .json({ success: false, msg: `no customer with id ${cid}` })
      }
    res.status(200).json({ success: true, data: customer })
  }

//Add new customer
  const createCustomer = (req, res) => {
    const customer = req.body
    const { id} = req.params
    //Check if agent exists then add customer
    if (!customer.agent_id) {
        return res
            .status(400)
            .json({
                success: false,
                msg: 'please provide agent _id value'
            })
    }
    const persons = customers.find((person) => person.agent_id === Number(id))
    if (!persons) {
      return res
        .status(404)
        .json({ success: false, msg: `no agent with id ${id} who have customers` })
    }
    //Check if customer not exists then add customer
    const oldcustomer = customers.find((oldcustomer) => oldcustomer.agent_id === Number(id) && oldcustomer._id === Number(customer._id) )
    if (oldcustomer) {
        return res
          .status(404)
          .json({ success: false, msg: `customer with exists id ${customer._id}, please provide other value` })
      }
    if (!customer.name) {
        return res
            .status(400)
            .json({
                success: false,
                msg: 'please provide customer name value'
            })
    }
    if (!customer.address) {
        return res
            .status(400)
            .json({
                success: false,
                msg: 'please provide customer address value'
            })
    }

    customers.push(customer)
    const newCustomer = customers.find((newCustomer) => newCustomer.agent_id === Number(id) && newCustomer._id === Number(customer._id) )
    res.status(201).send({ success: true, customer: newCustomer })
  }

  //Update existing customers
  const updateCustomer = (req, res) => {
    const { id,cid } = req.params
    const customer = req.body
  
    //Check if agent exists then update customer
    if (!customer.agent_id) {
        return res
            .status(400)
            .json({
                success: false,
                msg: 'please provide agent _id value'
            })
    }
    const persons = customers.find((person) => person.agent_id === Number(id))
    if (!persons) {
      return res
        .status(404)
        .json({ success: false, msg: `no agent with id ${id}` })
    }
    //Check if customer exists then update customer
    const oldcustomer = customers.find((oldcustomer) => oldcustomer.agent_id === Number(id) && oldcustomer._id === Number(cid) )
    if (!oldcustomer) {
        return res
          .status(404)
          .json({ success: false, msg: `no customer with exists id ${id}` })
      }
    
    //update all data except id, agentid and guid
    const newcustomer = customers.map((oldcustomer) => {
      if (oldcustomer._id === Number(cid) && oldcustomer.agent_id===Number(id)) {
        oldcustomer.name.first = customer.name.first,
        oldcustomer.name.last = customer.name.last,
        oldcustomer.isActive=customer.isActive,
        oldcustomer.balance = customer.balance,
        oldcustomer.age = customer.age,
        oldcustomer.eyeColor=customer.eyeColor,
        oldcustomer.company=customer.company,
        oldcustomer.email = customer.email,
        oldcustomer.phone = customer.phone,
        oldcustomer.address=customer.address,
        oldcustomer.registered=customer.registered,
        oldcustomer.latitude = customer.latitude,
        oldcustomer.longitude = customer.longitude,
        oldcustomer.tags=customer.tags
      }
      return oldcustomer
    })
    res.status(200).json({ success: true, data: newcustomer })
  }

  //Delete existing customer
  const deleteCustomer = (req, res) => {
    const { id ,cid} = req.params
    const persons = customers.find((person) => person.agent_id === Number(id))
    if (!persons) {
      return res
        .status(404)
        .json({ success: false, msg: `no agent with id ${id}` })
    }
    const customer = customers.findIndex((person) => person.agent_id === Number(id) && person._id === Number(cid) )
    
    if (!customer || customer < 0) {
        return res
          .status(404)
          .json({ success: false, msg: `no customer with id ${cid}` })
      }
      //console.log(customer);
    customers.splice(customer,1)
    return res.status(200).json({ success: true, msg: `customer with id ${cid} , deleted`})
  }
  
  module.exports = {
    getCustomersByAgentId,
    getCustomerdataById,
    createCustomer,
    updateCustomer,
    deleteCustomer
  }