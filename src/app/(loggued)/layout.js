import NavBar from '@/Components/NavBar'
import React from 'react'

const layout = ({children}) => {
  return (
<NavBar>
    {children}
</NavBar>
)
}

export default layout