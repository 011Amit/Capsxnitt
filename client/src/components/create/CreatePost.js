

import { useState, useEffect, useContext } from 'react';
import { Box, styled, FormControl, InputBase,Button, TextareaAutosize } from '@mui/material';
import {AddCircle as Add} from '@mui/icons-material';
import { DataContext } from '../../context/DataProvider';

import {useLocation, useNavigate} from 'react-router-dom';

import {API} from '../../service/api'
const Image = styled('img')({
    width: '100%',
    height: '50vh',
    objectFit: 'cover'
})

const Container = styled(Box)(({theme})=>({
    margin:'50px 100px',
    [theme.breakpoints.down('md')]:{
        margin:0
    }
}));

const StyledFormcontrol=styled(FormControl)`
   margin-top:10px;
   display:flex;
   flex-direction:row;

`;
const InputTextField=styled(InputBase)`
    flex:1;
    margin:0 30px;
    font-size:25px;
    
`;
const Textarea= styled(TextareaAutosize)`
    width:100%;
    margin-top:50px;
    font-size: 18px;
    border:none;
    &: focus-visible {
        outline: none;
    }
`;

const initialPost = {
    title:'',
    description:'',
    picture:'',
    username:'',
    categories:'',
    createDate: new Date()
}
const CreatePost = () => {
    const [post, setPost] = useState(initialPost);
    const [file, setFile] = useState('');
    
    const url = post.picture ? post.picture :'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

    const {account} = useContext(DataContext);

    const location = useLocation();

    const navigate = useNavigate();

    useEffect(()=>{
        const getImage = async() =>{
            if(file){
                const data = new FormData();
                data.append("name",file.name);
                data.append("file",file);
                
                const response = await API.uploadFile(data);
                post.picture =  response.data;
            }
        }
        getImage();
        post.categories =location.search?.split('=')[1] || 'All';
        post.username=account.username;
    },[file])

    const handleChange = (e)=>{
        
        setPost({...post,[e.target.name]:e.target.value})
    }
    const savePost= async()=>{
        const response = await API.createPost(post);
        if(response.isSuccess){
            navigate('/');
        }
    }
    return (
       
            <Container>
                <Image src={url} alt='Banner' />
                <StyledFormcontrol>
                    <label htmlFor='fileInput'>
                        <Add fontSize='large' color='action'/>
                    </label>
                    <input 
                    type='file'
                    id="fileInput" 
                    style={ {display : 'none'}}
                    onChange={(e) => setFile(e.target.files[0])}
                    />
                    <InputTextField placeholder='Title' onChange={(e) => handleChange(e)} name="title"/>
                    <Button variant='contained' onClick={()=> savePost()}>PUBLISH</Button>
                    
                </StyledFormcontrol>
                <Textarea
                     minRows={3}
                     placeholder="Enter the text"
                     name="description"
                     onChange={(e) => handleChange(e)}
                    
                    />
            </Container>
            
     
    )
}
export default CreatePost;