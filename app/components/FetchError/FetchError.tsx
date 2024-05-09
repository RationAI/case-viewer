import React from 'react';

type Props = {
  message: string;
};

const FetchError = ({ message }: Props) => {
  return <div>Fetch failed: {message}</div>;
};

export default FetchError;
