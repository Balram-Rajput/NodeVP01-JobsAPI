const JobSchema = require("../models/Job")
const {BadRequestError,NotFoundError} = require("../errors")
const {StatusCodes} = require("http-status-codes")

const getAllJobs = async(req,res)=>{
    const jobs = await JobSchema.find({createdBy:req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs, count: jobs.length,user:req.user})
}

const getJob = async(req,res)=>{ 
    const {user:{userId},params:{id:jobId}} = req
    const job = await JobSchema.findOne({
        _id:jobId,createdBy:userId
    })
    if(!job){
        throw new NotFoundError(`No job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
}

const createJob = async(req,res)=>{
    req.body.createdBy = req.user.userId
    const job = await JobSchema.create(req.body)
    console.log(job)

    res.status(StatusCodes.CREATED).json({job})
}

const updateJob  = async(req,res)=>{
    const {
        body:{company,position},
        user:{userId},
        params:{id:jobId}
    } = req

    if(company === "" || position === ""){
        throw new BadRequestError("Company or Position fields cannot be empty")
    }

    const job = await JobSchema.findByIdAndUpdate({_id:jobId,createdBy:userId},req.body,{new:true,runValidators:true})
    if(!job){
        throw new NotFoundError(`No job with this id : ${jobId}`)
    }

    res.status(StatusCodes.OK).json({job})
}

const deleteJob  = async(req,res)=>{
    const {
        user:{userId},
        params:{id:jobId}
    } = req
    const job = await JobSchema.findOneAndRemove({_id:jobId,createdBy:userId})
    if(!job){
        throw new NotFoundError(`No job with this id : ${jobId}`)
    }

    res.status(StatusCodes.OK).json({msg:"Job delete sucessfully !"})
}



module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}