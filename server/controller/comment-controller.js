
import Comment from '../model/comment.js';

export const newComment = async (req,res)=>{
    try{
        const comment = await new Comment(req.body);
        comment.save();
        res.status(200).json({msg: 'comment saved Successfully'});
    }
    catch(error){
        res.status(500).json({error:error.message});
    }


}
export const getComments = async(req,res)=>{
    try{
        const comments = await Comment.find({postId: req.params.id});
        res.status(200).json(comments);
    }
    catch(error){
        res.status(500).json({error:error.message});
    }
}

export const deleteComment = async(req,res) =>{
    try{
        await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: 'comment deleted successfully'});
    }catch(erro){
        res.status(500).json({error:error.message});
    }
}