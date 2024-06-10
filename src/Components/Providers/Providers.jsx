'use client'
import { ThemeProvider, createTheme, useTheme } from '@mui/material'
import React from 'react'
import { AuthProvider } from './AuthProvider'
import { ConfirmProvider } from 'material-ui-confirm'
import { SnackbarProvider } from 'notistack'

const Providers = ({ children }) => {

    const darkTheme = createTheme({
        palette: {
            mode: 'dark'
        },
        typography: {
            fontFamily: 'var(--font-helvetica)',
            fontWeightLight: 100,
            fontWeightRegular: 300,
            fontWeightBold: 400,
            fontWeightMedium: 200,
            fontSize: 11
        },

    })

    return (

        <>
            <AuthProvider>
                <ThemeProvider theme={lightTheme}>
                    <ConfirmProvider>
                        <ThemeProvider theme={darkTheme}>
                            <SnackbarProvider
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left'
                                }}
                                className=' font-thin'
                            >
                                {children}
                            </SnackbarProvider>
                        </ThemeProvider>
                    </ConfirmProvider>
                </ThemeProvider>
            </AuthProvider>
        </>)
}

const lightTheme = createTheme({
    palette: {
        mode: 'light'
    },
    typography: {
        fontFamily: 'var(--font-helvetica)',
        fontWeightLight: 100,
        fontWeightRegular: 300,
        fontWeightBold: 400,
        fontWeightMedium: 200,
        fontSize: 11
    },

})


export { lightTheme }
export default Providers