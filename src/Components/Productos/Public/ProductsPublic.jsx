import { useProduct } from '@/Hooks/useProduct'
import React, { useCallback, useEffect, useState } from 'react'
import ProductCard from './ProductCard'
import BuscadorProductos from '../BuscadorProductos'
import CategoriesFilter from './CategoriesFilter'


const ProductsPublic = () => {
    const { productsList } = useProduct(true)


    const [products, setProducts] = useState([]);

    const handleSearch = useCallback((searchTerm) => {
        if (searchTerm.trim()) {
            const lowercasedTerm = searchTerm.toLowerCase();
            const results = productsList.filter(product =>
                (product.name.toLowerCase().includes(lowercasedTerm) ||
                    product.description.toLowerCase().includes(lowercasedTerm)) && !product?.is_variant
            );
            setProducts(results);
        } else {
            setProducts(productsList.filter(e => !e?.is_variant));
        }
    }, [productsList]);


    useEffect(() => {
        setProducts(productsList);
    }, [productsList]);

    const handleCategoryFilter=(selectedCategories)=>{
        if(selectedCategories?.length>0){
            const results = productsList.filter(product => product?.categories?.some(cat=>selectedCategories?.includes(cat)) && !product?.is_variant )
            
            setProducts(results);
        }else{
            setProducts(productsList.filter(e => !e?.is_variant));
        }
    }




    return (
        <div className=' efecto-vidrio  w-full h-full flex flex-col gap-2 p-4'>
            <div className='w-1/3'>

            <BuscadorProductos onSearch={handleSearch}
            />
            </div>
            <div className='absolute left-8 overflow-auto h-[85vh] top-20'>
                <CategoriesFilter onFilter={handleCategoryFilter} />
            </div>
            <div className='grid grid-cols-3 overflow-auto gap-4'>

                {products?.map((el, idx) => {
                    return (<ProductCard data={el} />)
                })}
            </div>
        </div>
    )
}

export default ProductsPublic