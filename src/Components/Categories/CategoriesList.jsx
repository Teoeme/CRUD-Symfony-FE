import { useCategory } from '@/Hooks/useCategory';
import { Add, AddCircleOutline, AddOutlined, Check, DeleteOutline, EditOffOutlined, EditOutlined, SaveOutlined } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { useConfirm } from 'material-ui-confirm';
import React, { useEffect, useState } from 'react'

const CategoriesList = ({ categories, setCategories }) => {
    const { updateCategory, deleteCategory, addCategory } = useCategory()
    const confirm = useConfirm()


    const CategoryItem = ({ data, nivel }) => {
        const [edit, setEdit] = useState(false);
        const [value, setValue] = useState({});

        useEffect(() => {
            setValue(data)
        }, []);

        const handleSave = async () => {
            let res = data?.Mode === 'Add' ? await addCategory(value) : await updateCategory(value)
        }

        const handleRemove = async () => {
            confirm({
                title: 'Eliminar categoría',
                description: '¿Desea eliminar la categoría? Se eliminarán las cateogrias hijo también',
                confirmationText: "Eliminar",
                cancellationText: "Cancelar",
                cancellationButtonProps: { color: "error" }
            }).then(async () => {
                let res = await deleteCategory(value?.id)
            })
        }

        const handleAdd = () => {
            let newCategories = [...categories];
            let steps = nivel.split('-').map(Number);
            let currentNode = newCategories;
            for (let i = 0; i < steps.length - 1; i++) {
                currentNode = currentNode[steps[i]].children;
                console.log(currentNode)
            }

            const parent = currentNode[steps[steps.length - 1]];
            if (!parent?.children) {
                parent.children = [];
            }
            parent.children.push({ name: '', Mode: 'Add', children: [], parent_id: parent?.id });

            setCategories(newCategories);
        }


        return (
            <div className=' flex w-full text-xs   items-start font-light text-zinc-100 '>
                <div className='flex'>
                    <span className='flex items-center px-2  min-w-[130px] justify-between '>
                        {edit || data?.Mode === 'Add' ? <TextField variant='standard' size='small' value={value?.name} onChange={(e) => setValue(pv => ({ ...pv, name: e.target.value }))} /> : <p>{data?.name}</p>}
                        {edit || data?.Mode === 'Add' ? <IconButton
                            onClick={() => {
                                setValue(data)
                                handleSave()
                            }}
                        > <SaveOutlined color='success' /></IconButton> : <IconButton
                            onClick={() => {
                                setValue(data)
                                setEdit(!edit)
                            }}
                        > <EditOutlined /></IconButton>}
                        {edit && <IconButton color='error'
                            onClick={handleRemove}
                        ><DeleteOutline /></IconButton>}

                    </span>
                    {data?.id && <div className='flex justify-start'>

                        <IconButton onClick={handleAdd}><Add /></IconButton>
                    </div>}
                </div>

                <div >
                    {data?.children?.length === 1 ? <CategoryItem data={data?.children[0]} nivel={`${nivel}-0`} /> : data?.children?.length > 1 &&
                        <div>
                            {data?.children?.map((child, i) => {
                                return (<CategoryItem data={child} nivel={`${nivel}-${i}`} />)
                            })}
                        </div>
                    }

                </div>

            </div>
        )
    }

    return (
        <div className=' flex flex-col gap-4 efecto-vidrio p-4 max-w-[60vw] overflow-auto text-sm'>

            {categories?.map((cat, idx) => {

                return (
                    <span className=' border-b border-zinc-300/20 w-full'>
                        <CategoryItem data={cat} nivel={`${idx}`} />
                    </span>
                )
            })}
            <div className='flex w-full'>

                <IconButton onClick={() => {
                    let newCategories = [...categories]
                    newCategories.push({ name: '', Mode: 'Add' })
                    setCategories(newCategories)
                }}><Add /></IconButton>
            </div>
        </div>
    )
}

export default CategoriesList