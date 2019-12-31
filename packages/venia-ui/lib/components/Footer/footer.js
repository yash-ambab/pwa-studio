import React from 'react';
import { shape, string } from 'prop-types';
import { useFooter } from '@magento/peregrine/lib/talons/Footer/useFooter';

import { mergeClasses } from '../../classify';
import defaultClasses from './footer.css';
import GET_STORE_CONFIG_DATA from '../../queries/getStoreConfigData.graphql';
import CmsBlock from '../CmsBlock';
import myStyles from 'style-loader!css-loader!../../../assets/style.css';

const Footer = props => {
    const classes = mergeClasses(defaultClasses, props.classes);

    const talonProps = useFooter({
        query: GET_STORE_CONFIG_DATA
    });
    const { copyrightText } = talonProps;

    let copyright = null;
    if (copyrightText) {
        copyright = <span>{copyrightText}</span>;
    }

    return (
    <React.Fragment>
    <footer id="htc__footer">
    <div className="footer__container bg__cat--1">
        <div className="container">
            <div className="row">
                <CmsBlock identifiers="footer-info" />
                <div className="col-md-3 col-sm-6 col-xs-12 xmt-40 smt-40">
                    <div className="footer">
                        <h2 className="title__line--2">NEWSLETTER </h2>
                        <div className="ft__inner">
                            <div class="news__input">
                                <input type="text" placeholder="Your Mail*" />
                                <div class="send__btn">
                                    <a class="fr__btn" href="#">Send Mail</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="htc__copyright bg__cat--5">
        <div className="container">
            <div className="row">
                <div className="col-xs-12">
                    <div className="copyright__inner">
                        <p>{copyright}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</footer>

        {/* <footer>
            <div className={classes.tile}>
                <h2 className={classes.tileTitle}>
                    <span>Your Account</span>
                </h2>
                <p className={classes.tileBody}>
                    <span>
                        Sign up and get access to our wonderful rewards program.
                    </span>
                </p>
            </div>
            <div className={classes.tile}>
                <h2 className={classes.tileTitle}>
                    <span>inquiries@example.com</span>
                </h2>
                <p className={classes.tileBody}>
                    <span>
                        Need to email us? Use the address above and we&rsquo;ll
                        respond as soon as possible.
                    </span>
                </p>
            </div>
            <div className={classes.tile}>
                <h2 className={classes.tileTitle}>
                    <span>Live Chat</span>
                </h2>
                <p className={classes.tileBody}>
                    <span>Mon – Fri: 5 a.m. – 10 p.m. PST</span>
                    <br />
                    <span>Sat – Sun: 6 a.m. – 9 p.m. PST</span>
                </p>
            </div>
            <div className={classes.tile}>
                <h2 className={classes.tileTitle}>
                    <span>Help Center</span>
                </h2>
                <p className={classes.tileBody}>
                    <span>Get answers from our community online.</span>
                </p>
            </div>
            <small className={classes.copyright}>{copyright}</small>
        </footer>*/}
    </React.Fragment>
    );
};

Footer.propTypes = {
    classes: shape({
        copyright: string,
        root: string,
        tile: string,
        tileBody: string,
        tileTitle: string
    })
};

export default Footer;
