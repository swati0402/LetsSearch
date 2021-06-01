let { agents } = require('../data/data.js');
let agent = require('../models/agent.js');

//List All Agents
const getAgent = (req, res) => {
    res.status(200).json({
        success: true,
        data: agents
    })
}

//List Agent by Id
const getAgentById = (req, res) => {
    const {
        id
    } = req.params
    const person = agents.find((person) => person._id === Number(id))

    if (!person) {
        return res
            .status(404)
            .json({
                success: false,
                msg: `no agent with id ${id}`
            })
    }
    res.status(200).json({
        success: true,
        data: person
    })
}

//Add new Agent
const createAgent = (req, res) => {

    const agent = req.body

    if (!agent._id) {
        return res
            .status(400)
            .json({
                success: false,
                msg: 'please provide agent _id value'
            })
    }
    if (!agent.name) {
        return res
            .status(400)
            .json({
                success: false,
                msg: 'please provide agent name value'
            })
    }
    if (!agent.city) {
        return res
            .status(400)
            .json({
                success: false,
                msg: 'please provide agent city value'
            })
    }
    if (!agent.state) {
        return res
            .status(400)
            .json({
                success: false,
                msg: 'please provide agent state value'
            })
    }
    const person = agents.find((person) => person._id === Number(agent._id))

    if (person) {
        return res
            .status(404)
            .json({
                success: false,
                msg: `person already exists with id ${agent._id}, provide different value`
            })
    }

    agents.push(agent)
    const newAgent = agents.find((newAgent) => newAgent._id === Number(agent._id))

    res.status(201).send({
        success: true,
        agent: newAgent
    })
}

//update existing agent information
const updateAgent = (req, res) => {
    const {
        id
    } = req.params
    const {
        name,
        address,
        city,
        state,
        zipCode,
        tier,
        phone: {
            primary,
            mobile
        }
    } = req.body

    const person = agents.find((person) => person._id === Number(id))

    if (!person) {
        return res
            .status(404)
            .json({
                success: false,
                msg: `no person with id ${id}`
            })
    }
    const newAgent = agents.map((person) => {
        if (person._id === Number(id)) {
                person.name = name,
                person.address = address,
                person.city = city,
                person.state = state,
                person.zipCode = zipCode,
                person.tier = tier,
                person.phone.primary = primary,
                person.phone.mobile = mobile
        }
        return person
    })
    res.status(200).json({
        success: true,
        data: newAgent
    })
}


module.exports = {
    getAgent,
    getAgentById,
    createAgent,
    updateAgent
}