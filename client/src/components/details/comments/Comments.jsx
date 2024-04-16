
import {Box,TextareaAutosize, Button,styled} from '@mui/material';


import { useState, useEffect,useContext } from 'react';

import { DataContext } from '../../../context/DataProvider';

import Comment from './Comment';

import {API} from '../../../service/api'
const Container = styled(Box)`
    margin-top: 100px;
    display:flex;
`
const Image = styled('img')({
    width:50,
    height:50,
    borderRadius: '50%'
});
 const StyledTextArea = styled(TextareaAutosize)`
    height: 100px;
    width: 100%;
    margin: 0 20px;
 `;

 const initialvalues = {
     name:'',
     postId: '',
     comments:'',
     date: new Date()
 }
const Comments = ({post}) =>{
    const url='https://static.thenounproject.com/png/12017-200.png';
    const [comment,setComment] = useState(initialvalues);
    const {account} = useContext(DataContext);
    const handleChange = (e) =>{
        setComment({
            ...comment,
            name:account.username,
            postId:post._id,
            comments:e.target.value
        })
    }
    const addComment= async(e) =>{
        let res = await API.newComment(comment);
        if(res.isSuccess){
            setComment(initialvalues);
        }
        setToggle(prevState =>!prevState);
    }

    const [comments,setComments]=useState([]);
    const [toggle,setToggle] = useState(false);
    useEffect(()=>{
        const getData = async() =>{
            let res = await API.getAllComments(post._id);
            if(res.isSuccess){
                setComments(res.data);
            }
        }
        if(post._id){
            getData();
        }
        
    },[post,toggle]);
    return (
        <Box>
           <Container>
                <Image src={url} alt="dp"/>
                <StyledTextArea
                minRows={5}
                placeholder="what's on your mind"
                value={comment.comments}
                onChange={(e)=> handleChange(e)}
                />
                <Button 
                variant='contained' 
                size="medium"  
                style={{height: 40}}
                onClick={(e)=> addComment(e)}
                >Post</Button>
           </Container>
           <Box>
                {
                    comments && comments.length >0 && comments.map(comment => (
                        <Comment comment={comment} setToggle={setToggle}/>
                    ))
                }
           </Box>
        </Box>
    )
}

export default Comments;