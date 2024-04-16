
import {AppBar, Toolbar, Typography, styled,Box} from '@mui/material';

import { DataContext } from '../../context/DataProvider';
import {Link} from 'react-router-dom';
import { useContext } from 'react';
import { Margin } from '@mui/icons-material';

const Component = styled(AppBar)`
    background:#FFFFFF;
    color:#000;
`
const Container = styled(Toolbar)`
    justify-content:center;
    & > a{
        padding :20px;
        text-decoration:none;
        color:inherit;
        
    },
    & > a:hover{
        background:blue;
        color:white;
        border-radius:10px;
    }
`
const Item = styled(Box)`
    color: blue;
`

const Header = () =>{
    const {account} = useContext(DataContext);
    return (
        <Component>
             <Container >
                <Link to='/'>HOME</Link>
                <Link to='/about'>ABOUT</Link>
                <Link to='/contact'>CONTACT</Link>
                <Link to='/login'>LOGOUT</Link>
                <Item>{account.username}</Item>
             </Container>
             
        </Component>
    )
}

export default Header;