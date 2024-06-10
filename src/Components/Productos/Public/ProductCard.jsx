import { formatPeso } from '@/utils/dateHelpers'
import Image from 'next/image'
import React from 'react'

const ProductCard = ({data}) => {
  return (
    <div className=' font-helvetica text-white font-thin w-[230px] h-[300px] bg-red-200/20 overflow-hidden rounded efecto-vidrio'>
        <div className=' w-full h-1/2 bg-lime-100/20'>
            <Image src={data?.images?.[0]} width={120} height={120} alt={`imagen-${data?.name}`} className=' w-full h-full object-cover shadow-md' />
        </div>
    <div className=' p-2 flex flex-col h-1/2'>
        <p className=' font-light'>{data?.name}</p>
        <p className=' text-xxs flex-1 text-ellipsis overflow-hidden'>
            {data?.description}
        </p>

        <p className=' w-full flex justify-end'>{formatPeso(data?.sell_price)}</p>
    </div>
    </div>
  )
}

export default ProductCard