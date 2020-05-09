import React from 'react';
import Loadable from 'react-loadable';

import Loading from '../../components/Loading';

const LoadableNotFound = Loadable({
  loader: () => import(/* webpackChunkName 'NotFound' */ './NotFound'),
  loading: Loading
});

export default function() {
  return <LoadableNotFound />
}