import React from 'react';

export const ErrorDisplay = ({errMess}) => {
  return (
      <h4 className="my-5 text-center text-danger">{errMess}</h4>
  );
};