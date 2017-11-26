import React from 'react'

class Footer extends React.Component {
    render() {
        return (
            <footer>
                &copy;Trollmoj { new Date().getFullYear() }
            </footer>
        )
    }
}

export default Footer;