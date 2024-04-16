import {useState,useContext} from 'react';

import { Box, TextField, Button, styled, Typography } from '@mui/material';

import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai';
import { API } from '../../service/api';
import {useNavigate} from  'react-router-dom';
import { DataContext } from '../../context/DataProvider';

import { toast } from 'react-toastify';
const Component = styled(Box)`
    width:400px; 
    margin:auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`
const Image = styled('img')({
    width: 100,
   
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0',
});

const Wrapper = styled(Box)`
    padding: 25px 35px; 
   
    display:flex;
    flex:1;
    flex-direction:column;
    & > div,& > button,& >p{
        margin-top: 20px;
    }
    
`
const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB6418;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`
const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`
const Text =styled(Typography)`
    color:#878787;
`
const Title = styled(Box)`
     display:inline-block;
     font-weight:bold;
     font-size:25px;
     margin-top:10px;
     box-shadow: 0 4px 6px 0 rgb(0 0 0/ 30%);
     border-radius:2px;
`
const Error = styled(Typography)`
    font-size:10px;
    color: #ff6161;
    line-height:0;
    margin-top: 10px;
    font-weight:bold;
`

const  signUpIntialValues={
    name:'',
    username:'',
    password:'',
}
const loginInitialvalues = {
    username:'',
    password:''
}
const Login = ({isUserAuthenticated}) => {
    const imageURL= 'https://upload.wikimedia.org/wikipedia/commons/0/0b/NITT_logo.png';
    // const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const [account,toggleaccount] = useState('login');
    const [signup,setSignup] =useState(signUpIntialValues);
    const [login,setLogin] = useState(loginInitialvalues);
    const [error,setError] = useState('');

    const {setAccount} =useContext(DataContext);
    const navigate = useNavigate();
    const togglesignup = ()=>{
        toggleaccount('signup');
    }
    const togglelogin = ()=>{
        toggleaccount('login');
    }
    const onInputchange =(e)=>{
        setSignup( {...signup,[e.target.name]:e.target.value });
    }
    const signupUser = async ()=>{
        let response = await API.userSignup(signup);
        if(response.isSuccess){
            setError('');
            setSignup(signUpIntialValues);
            toggleaccount('login');
        }
        else{

            setError('Something went wrong! please try again later');
        }
    }

    const onValueChange = (e)=>{
        setLogin({...login,[e.target.name]:e.target.value});
    }

    const loginUser = async()=>{
        let response = await API.userLogin(login);
        if(response.isSuccess){
            toast.success('login successfully')
            setError('');
            sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
            sessionStorage.setItem('refreshToken', `Bearer ${response.data.refreshToken}`);
            setAccount({username: response.data.username,name:response.data.name});
            isUserAuthenticated(true);
            navigate('/');
        }
        else{
            //<ToastNotification/>
            toast.error('Invalid username or password');
            // setError('Something went wrong! please try again later');
        }
    }  
    return (
        <Component >
            <Box>
                <Image src={imageURL} alt="login" />
                <Box style={{textAlign:'center'}}>
                <Title > CAPSXNITT </Title>
                </Box>
                
                {
                
                    account ==='login' ?
                    
                        <Wrapper>
                            {/* controlled component */}
                            
                            <TextField variant="standard" autoComplete= 'off'  value={login.username} onChange={(e)=> onValueChange(e)} name='username' label="Enter username" />
                            
                            <TextField variant="standard"  autoComplete= 'off' value={login.password} onChange={(e)=> onValueChange(e)} name='password' label="Enter password " />
                            {/* <AiOutlineEye/> */}
                            {error && <Error>{error}</Error>}
                            <LoginButton variant='contained' onClick={()=> loginUser()} >Login</LoginButton>
                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <SignupButton onClick={togglesignup}>Create an Account</SignupButton>
                        </Wrapper>
                    
                    :
                    
                        <Wrapper>
                            <TextField variant="standard" autoComplete= 'off' value={signup.name} name='name' onChange={(e)=>{onInputchange(e)}} label="Enter Name"/>
                            <TextField variant="standard" autoComplete= 'off' value={signup.username} name='username' onChange={(e)=>{onInputchange(e)}} label="Enter username"/>
                            <TextField variant="standard" autoComplete= 'off' value={signup.password}  name='password' onChange={(e)=>{onInputchange(e)}} label="Enter password"/>
                            {error && <Error>{error}</Error>}
                            <SignupButton onClick={()=> signupUser()}>Sign Up</SignupButton>

                            <Text style={{ textAlign: 'center' }}>OR</Text>
                            <LoginButton variant='contained' onClick={togglelogin}>Already have and Account</LoginButton>
        
                        </Wrapper>
                }
                
            </Box>
        </Component>
    )
}
export default Login;