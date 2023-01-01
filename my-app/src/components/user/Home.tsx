import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import CartIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import Box from '@mui/material/Box';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import ImageIcon from '@mui/icons-material/Image';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import  React, {useState,useEffect}from 'react'
import axios from 'axios';
import { Container } from '@mui/system';




const Home= () => {
    const[product,setProductList]=useState([{}])
  
    useEffect(()=>{
      console.log("heloo")
      axios.get('http://127.0.0.1:8000/reviews/productlist')
      .then(res =>{
        console.log(res.data)
        setProductList(res.data)
      })
    },[]) 


    return (
        <div>
            <Container>
    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
    <ImageList sx={{ width: 1600 }} cols={4} rowHeight={164}>
      {product.map((item:any) => (
        <Card key={item?.img} sx={{height: 300}}>
          <AspectRatio>
            
              <img
                // src={`${item?.img}?w=248&fit=crop&auto=format`}
                src='https://images.unsplash.com/photo-1589118949245-7d38baf380d6'

                // srcSet={`${item?.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                srcSet='https://images.unsplash.com/photo-1589118949245-7d38baf380d6'
                alt={item.title}
                loading="lazy"
              />
            {/* </div>  */}
          </AspectRatio>
          <IconButton
            sx={{ color: "green" }}
          >Add To Cart
            <ShoppingCartIcon />
          </IconButton>

          <Typography mt={2}>{item.productName}</Typography>
          <Typography level="body2">Rs.{item.amount}/-</Typography>
          <Typography level="body2">{item.description}</Typography>
          <Typography level="body2">{item.rating} <StarBorderPurple500Icon /></Typography>
        </Card>
      ))}
    </ImageList>

   

    </Box>
  
    <Box>
      <Typography></Typography>
    </Box>
    </Container>

        </div>
    )
}

export default Home;