import React from 'react'
import Footer from '../Components/footer/Footer'
import Navigation from '../Components/navbar/Navigation'

const MainLayout = ({ children }) =>
{
    return (
        <>
            <Navigation />
            { children }
            <Footer />
        </>
    )
}

export default MainLayout
