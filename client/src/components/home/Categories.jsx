
import { Button, Table, TableHead, TableBody, TableCell, TableRow, styled } from '@mui/material';

import {Link, NavLink,useSearchParams} from 'react-router-dom';

import { categories } from '../../constants/data';
//import './Categories.css';

const StyledTable = styled(Table)`
    border : 1px solid rgba(224,224,224,1);
    & > tr:hover{
        color:white;
        background:blue;
    }
`
const StyledButton = styled(Button)`
        margin:20px;
        width:85%;
        background:#6495ED;
        color:#fff;
`
const StyledLink= styled(NavLink)`
    text-decoration:none;
    color: inherit;
    hover: red;
` 
const Categories = () => {
    const [searchParams] =useSearchParams();
    const category = searchParams.get('category');
    return (
        <>
            <StyledLink to={`/create?category=${category || ''}`}>
            <StyledButton variant='contained'>Share Your Expreience Here</StyledButton>
            </StyledLink>

            <StyledTable >
                <TableHead>
                    <TableRow hover>
                        <TableCell>
                            <StyledLink to='/'>
                                All Categories
                            </StyledLink>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow hover key={category.id}>
                                <TableCell>
                                    <StyledLink to={`/?category=${category.type}`}>
                                        {category.type}
                                    </StyledLink> 
                                </TableCell>
                            </TableRow>
                        ))
                    }

                </TableBody>
            </StyledTable>
        </>

    )
}
export default Categories;