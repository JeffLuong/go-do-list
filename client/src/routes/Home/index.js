import React from 'react';
import Loadable from 'react-loadable';

import Loading from '../../components/Loading';

const LoadableHome = Loadable({
  loader: () => import(/* webpackChunkName 'Home' */ './Home'),
  loading: Loading
});

export default function() {
  return <LoadableHome />
}