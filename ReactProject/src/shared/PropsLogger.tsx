import React, { useEffect } from 'react';

type Props = any;

function logProps(Component: React.FunctionComponent) {
  const LogProps: React.FunctionComponent<any> = (props) => {
    useEffect(() => {
      console.log(props);
    }, [props]);

    return <Component {...props} />;
  };

  return LogProps;
}

export default logProps;
