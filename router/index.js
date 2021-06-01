const express = require('express')
const router = express.Router()
const {
    getAgent,
    getAgentById,
    createAgent,
    updateAgent,
} = require('../controllers/agentcontroller')
const {
    getCustomersByAgentId,
    getCustomerdataById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
} = require('../controllers/customercontroller')

router.route('/').get(getAgent).post(createAgent)
router.route('/:id').get(getAgentById).put(updateAgent)
router.route('/:id/customer').get(getCustomersByAgentId).post(createCustomer)
router.route('/:id/customer/:cid').get(getCustomerdataById).put(updateCustomer).delete(deleteCustomer)
module.exports = router