


const getAllValues = async (req,res) => {
    res.send('get all')
 }

 const getValue = async (req,res) => {
    res.send('get single value')
 }
 const createValue = async (req,res) => {
    res.send('Create Value')
 }
 const deleteValue = async (req,res) => {
    res.send('delete Value')
 }

 const updateValue = async (req,res) => {
    res.send('update')
 }



 module.exports = {
    getAllValues,
    getValue,
    createValue,
    deleteValue,
    updateValue
   
 }