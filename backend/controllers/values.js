
const Value = require('../models/Value')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError,NotFoundError} = require('../errors')


const getAllValues = async (req,res) => {
   const {value} = req.body
   const {userId} = req.jwtInfo
   const newValue = await Value.find({createdBy:userId})

   if(!newValue) {
      throw new BadRequestError('Something went wrong.')
   }
   res.status(StatusCodes.CREATED).json({newValue})
 }

 const getValue = async (req,res) => {
   const {id} = req.params
   const {userId} = req.jwtInfo
   const newValue = await Value.findOne({  
      _id: id,
      createdBy: userId})

   if(!newValue) {
      throw new NotFoundError(`No task found with this ID: ${id}`)
   }

   res.status(StatusCodes.OK).json({newValue})
 }
 const createValue = async (req,res) => {
   const {value} = req.body
   const {userId} = req.jwtInfo
   const newValue = await Value.create({value, createdBy:userId})
   res.status(StatusCodes.CREATED).json({newValue})
 }
 const deleteValue = async (req,res) => {
    const {userId} = req.jwtInfo
    const {id} = req.params

    const newValue = await Value.deleteOne({_id:id,createdBy:userId})
    if(!newValue) {
      throw new NotFoundError(`No task found with this ID: ${id}`)
   }
   res.status(StatusCodes.OK).json({newValue})
 }

 const updateValue = async (req,res) => {
   const {value} = req.body
   const {userId} = req.jwtInfo
   const {id} = req.params
  const newValue = await Value.findOneAndUpdate(
   { _id: id, createdBy: userId }, // Condições de pesquisa
   value, // Dados a serem atualizados
   { new: true, runValidators: true } // Opções de configuração
   )
  
  if(!newValue) {
   throw new NotFoundError(`No task found with this ID: ${id}`)
}

   res.status(StatusCodes.OK).json({newValue})
 }



 module.exports = {
    getAllValues,
    getValue,
    createValue,
    deleteValue,
    updateValue
   
 }