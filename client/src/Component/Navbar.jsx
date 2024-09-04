import React from 'react'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen)
    }
    return(
        
        <header>
            <nav>
                <a href="/">Job Portal</a>
            </nav>
        </header>
    )
}

export default Navbar