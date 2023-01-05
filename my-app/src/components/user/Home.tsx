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
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Input } from '@material-ui/core';
import IntField from '@mui/material/TextField';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
const options = ['Create a merge commit', 'Squash and merge', 'Rebase and merge'];






const Home = () => {
  const [product, setProductList] = useState([{}])
  const [filterStatus, setFilterStatus] = React.useState(false)
  const [sortStatus, setSortStatus] = React.useState(false)
  const [selectedName, setSelected] = useState([]);
  const [minAmount, setMinAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  let [sortAmount, setSortAmount] = useState<number>(0)

  console.log(selectedName)
  console.log(minAmount)
  console.log(sortAmount)

  const handleSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAmount(sortAmount = 1)
  };
  const changeSort = (event: React.MouseEvent<HTMLButtonElement>) => {
    setSortAmount(sortAmount = -1)
  };
  const handleChange = (value: any) => {
    if (value != null) {
      setSelected(value)
    }
    else {
      setSelected([])
    }

  }

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/reviews/product/?productName=${selectedName}&minAmount=${minAmount}&maxAmount=${maxAmount}&sortAmount=${sortAmount}`)

      .then(res => {
        console.log(res.data)
        setProductList(res.data)

      })
  }, [selectedName, maxAmount, minAmount, sortAmount])


  return (
    <div>
      <Container>
        <IconButton onClick={() => { setFilterStatus(!filterStatus) }}>
          <FilterAltIcon />
        </IconButton>


        {filterStatus && <Container>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={product.map((item: any) => (
              item.productName
            ))}
            onChange={(event, value) => handleChange(value)}
            sx={{ width: 200 }}
            renderInput={(params) => <TextField {...params} label="Filter By Name" />}

          />

          <TextField
            type="number"
            label="Min"
            value={minAmount}

            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMinAmount(Number(event.target.value))}
          />
          <TextField
            type="number"
            label="Max"
            value={maxAmount}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setMaxAmount(Number(event.target.value))}
          />


          <Button>Apply Filter</Button>
        </Container>}
        <IconButton onClick={() => { setSortStatus(!sortStatus) }}><SortIcon /></IconButton>

        {sortStatus && <Container>
          <Button onClick={handleSort}>Min<CurrencyRupeeIcon />-max<CurrencyRupeeIcon /></Button>OR
          <Button onClick={changeSort} >Max<CurrencyRupeeIcon />-min<CurrencyRupeeIcon /></Button>
        </Container>}

        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <ImageList sx={{ width: 1600 }} cols={4} rowHeight={164}>
            {product.map((item: any) => (
              <Card key={item.img} sx={{ height: 300 }}>
                <AspectRatio>

                  <img
                    // src={`${item?.img}?w=248&fit=crop&auto=format`}
                    src={item.productImage}

                    // srcSet={`${item?.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    srcSet={item.productImage}
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