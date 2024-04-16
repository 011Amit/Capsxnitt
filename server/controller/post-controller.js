
import Post from '../model/post.js';


export const createPost = async(req,res)=>{
    try{
        const post = await new Post(req.body);
        post.save();
        return res.status(200).json({msg:'Post saved successfully'});
    }
    catch(error){
        return res.status(500).json(error);
    }
}

export const getAllPosts=  async (req,res)=>{
    let category = req.query.category;
    let posts;
    try{
           if(category){
            posts =  await Post.find({categories : category});
           }
           else {
            posts =  await Post.find({});
           }
           return res.status(200).json(posts);
    }
    catch(error){
        return res.status(500).json({msg:error.message});
    }
}

export const getPost = async(req,res)=>{

    try{
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    }
    catch(error){
        console.log("hello world");
        return res.status(500).json({msg:error.message});
    }
}

export const updatePost = async(req,res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post) return res.status(404).json({msg : 'Post not found'})
        await Post.findByIdAndUpdate(req.params.id,{$set:req.body})
        return res.status(200).json({msg: 'Post updated Successfully'})
    }catch(error){
        return res.status(500).json({error:error.message})
    }
}
export const deletePost = async(req,res) =>{
    try{
        await Post.findByIdAndDelete(req.params.id);
        return res.status(200).json({msg: 'Post Deleted Successfully'})
    }
    catch(error){
        return res.status(500).json({error:error.message})
    }
}