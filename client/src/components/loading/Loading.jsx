import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import './Loading.css';

const LoadingPage = () => (<div className="center-page"><CircularProgress color="primary" /></div>);
const LoadingComponent = () => (<div className="center-component"><CircularProgress color="primary" /></div>);
const LoadingIcon = () => (<CircularProgress color="primary" />);

export { LoadingPage, LoadingComponent, LoadingIcon };
