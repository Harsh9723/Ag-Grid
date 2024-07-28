import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Table from './Pages/Table'
import axios from 'axios'
import Typography from '@mui/material/Typography'
import  Stack  from '@mui/material/Stack'
import { Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { lime, red } from '@mui/material/colors'
import { createTheme , ThemeProvider} from '@mui/material/styles'
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import AndroidOutlinedIcon from '@mui/icons-material/AndroidOutlined';
import Navbar from './Components/Navbar'

function App() {

  return (
        <div className=' bg-gradient-to-r from-yellow-50 to-red-200  h-dvh '>
      <Navbar />
    </div>
      
     
      
      
  )
}

export default App
