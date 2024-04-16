
import { useState, useEffect } from "react";

import {Box, Grid,styled} from '@mui/material';

import {API} from '../../../service/api';

import {useSearchParams, Link} from 'react-router-dom';

import Post from './Post.jsx';



const Posts = () => {
    const [posts,setPosts] =useState([]);

    const [searchParams] = useSearchParams();
    const category= searchParams.get('category');
   

    useEffect(()=>{
        const fetchData = async() => {
                let res = await API.getAllPosts({category: category || ''});
                if(res.isSuccess){
                    setPosts(res.data);
                }
        }
        fetchData();
    },[category]);
    return (
        <>
        {
            posts?.length ? posts.map(post => (
                <Grid item lg={3} sm={4} xs={12}>
                    <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post._id}`}>
                        <Post post={post} />
                    </Link>
                </Grid>
            )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                    No data is available for selected category
                </Box>
        }
    </>
        
    )
}
export default Posts;