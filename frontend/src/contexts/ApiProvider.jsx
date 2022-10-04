import React from 'react';
import { ApiContext } from './index.js';

const ApiProvider = ({ parentApi, children }) => {
  const {
    addNewMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  } = parentApi;

  return (
    <ApiContext.Provider value={{
      addNewMessage,
      addNewChannel,
      removeChannel,
      renameChannel,
    }}
    >
      {children}
    </ApiContext.Provider>
  );
};

export default ApiProvider;
