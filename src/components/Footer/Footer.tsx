import './Footer.css'

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer id="main-footer" className='main-footer'>
                Administration panel {year == 2023 ? year : 2023 + ' - ' + year}
        </footer>
    );
};