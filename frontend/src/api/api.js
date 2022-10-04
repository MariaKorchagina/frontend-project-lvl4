import store from '../slices/index.js';
import { actions as messagesActions } from '../slices/messages.js';
import { actions as channelsActions } from '../slices/channels.js';

const buildtSocketApi = (socket) => {
  const addNewMessage = (message) => socket.emit('newMessage', message)
  socket.on('newMessage', (payload) => {
    store.dispatch(messagesActions.addMessage(payload));
  });

  const addNewChannel = (channel) => socket.emit('newChannel', channel)
  socket.on('newChannel', (payload) => {
    store.dispatch(channelsActions.addChannel(payload));
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id })
  socket.on('removeChannel', (payload) => {
    store.dispatch(channelsActions.removeChannel(payload));
  });

  const renameChannel = (renamedChannel) => socket.emit('renameChannel', renamedChannel)
  socket.on('renameChannel', (payload) => {
    const { name, id } = payload;
    store.dispatch(channelsActions.changeChannelName({
      id,
      changes: {
        name,
      },
    }));
  });

  return {
    addNewMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };
};

export default buildtSocketApi;
