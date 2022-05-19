import React from 'react';

// Лоадер вставлен с сайта https://loading.io/css/

function Loader() {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
}

export default Loader;
