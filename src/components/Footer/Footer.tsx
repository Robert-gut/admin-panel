import './Footer.css'

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer id="main-footer" className='main-footer'>
           <span className='left-span'>
            <a className='footer-link' href='/admin'>Home</a>&bull;&nbsp;
            <a className='footer-link' href='/login'>Login</a>
           </span>
           <span className='right-span'>IT Step Rivne @ {year == 2023 ? year : 2023 + ' - ' + year}</span>
        </footer>
    );
};