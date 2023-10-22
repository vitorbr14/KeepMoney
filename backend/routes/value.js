const express = require('express')
const router = express.Router()
const {
    getAllValues,
    getValue,
    createValue,
    deleteValue,
    updateValue} = 
    require('../controllers/values')

router.route('/').post(createValue).get(getAllValues)
router.route('/:id').get(getValue).delete(deleteValue).patch(updateValue)
module.exports = router