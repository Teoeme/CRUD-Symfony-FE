import { TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

const BuscadorProductos = ({onSearch}) => {
    const [query, setQuery] = useState('');
    const debounceRef = useRef(null);


  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    
    debounceRef.current = setTimeout(() => {
        onSearch(query);
    }, 500); 

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, onSearch]);

  return (
    <TextField
    fullWidth
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    label='Buscar'
    />
  );
};

export default BuscadorProductos;

