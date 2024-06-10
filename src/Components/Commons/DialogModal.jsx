import { Close } from '@mui/icons-material'
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React from 'react'

const DialogModal = ({ open = false, children, setOpen, title, maxWidth, fullWidth = true, fullScreen = false, onClose = () => { } }) => {
  return (
    <Dialog open={open} fullWidth={fullWidth} maxWidth={maxWidth} fullScreen={fullScreen} scroll='paper' PaperProps={{ className: 'modal-clara ', sx: { background: 'none'} }}

    >
      <DialogTitle className='flex justify-between  pt-0 items-center px-0 h-0'>
        <p className='text-zinc-400 absolute top-2 left-2 uppercase text-xxs'>{title}</p>
        
        <IconButton
          size='small'
          color='primary'
          className=' !absolute top-0 right-0 '
          onClick={() => {
            setOpen()
            onClose()
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent className=' este min-h-[200px] xl:min-h-[450px] xl:!px-3 px-0 py-0 2xl:py-1 '>
        {children}
      </DialogContent>
    </Dialog>

  )
}

export default DialogModal