import React from 'react';
import { Helmet } from 'react-helmet';
import brand from 'dan-api/dummy/brand';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import { LoginFormV2 } from 'dan-components';
import styles from 'dan-components/Forms/user-jss';
import {API} from '../../../service';

class LoginV2 extends React.Component {
    constructor(props)
    {
        super(props);

        if(localStorage.getItem('fixLogin') == 'true')
        {
            props.history.push(`./fix`);
        }
    }

    submitForm(values) {
        API.login(values, 'loginAPI').then(res => 
        {
            localStorage.setItem('fixLogin', 'true');
            localStorage.setItem('fixToken', res.data.data[0].utoken);
            localStorage.setItem('fixUsername', values._root.entries[0][1]);
            
            this.setState({ valueForm: values});

            this.props.history.push(`./fix`);
        },
        (err) => 
        {
            localStorage.setItem('fixLogin', 'false');
            localStorage.setItem('fixToken', '');
            localStorage.setItem('fixUsername', '');
            console.log(`err API: ${err}`);
        });
    }

    render() {
        const title = brand.name + ' - Login';
        const description = brand.desc;
        const { classes } = this.props;
        return (
            <div className={classes.rootFull}>
                <Helmet>
                    <title>{title}</title>
                    <meta name="description" content={description} />
                    <meta property="og:title" content={title} />
                    <meta property="og:description" content={description} />
                    <meta property="twitter:title" content={title} />
                    <meta property="twitter:description" content={description} />
                </Helmet>
                <div className={classes.containerSide}>
                    <Hidden smDown>
                        <div className={classes.opening}>
                          <Typography variant="h3" component="h1" className={classes.opening} gutterBottom>
                            Welcome to&nbsp;
                            {brand.name}
                          </Typography>
                          <Typography variant="h6" component="p" className={classes.subpening}>Please sign in to continue</Typography>
                        </div>
                    </Hidden>
                    <div className={classes.sideFormWrap}>
                        <LoginFormV2 onSubmit={(values) => this.submitForm(values)} />
                    </div>
                </div>
            </div>
        );
    }
}

LoginV2.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginV2);
