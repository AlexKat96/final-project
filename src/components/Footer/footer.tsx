import React from 'react';
import css from "./footer.module.css"

function Footer() {
    return (
        <footer className={css.footer}>
            <div className={css.footer_content}>
                <div className={css.scan}></div>

                <div className={css.footer_info}>
                    <p className={css.text_style}>г. Москва, Цветной б-р, 40 <br></br> +7 495 771 21 11 <br></br> info@skan.ru</p>
                    <p className={css.text_style}>Copyright. 2022</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;