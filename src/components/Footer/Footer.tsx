import './Footer.css'
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export default function Footer() {
    const year = new Date().getFullYear();
    const scrollToTop = () => {
        window.scrollTo(0, 0);
    };
    return (
        <footer id="main-footer" className='main-footer'>
            <ExpandLessIcon {...{title: "Scroll to top"}} className='clickable' onClick={scrollToTop}/>
            &nbsp;&nbsp;
                Administration panel {year == 2023 ? year : 2023 + ' - ' + year}
            &nbsp;&nbsp;
            <ExpandLessIcon {...{title: "Scroll to top"}} className='clickable' onClick={scrollToTop}/>
        </footer>
    );
};