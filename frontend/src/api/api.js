import configure from '../slices/index.js';
import { actions as messagesActions } from '../slices/messages.js';
import { actions as channelsActions } from '../slices/channels.js';

const buildtSocketApi = (socket) => {
  const addNewMessage = (message) => socket.emit('newMessage', message)
  socket.on('newMessage', (arg) => {
    configure.dispatch(messagesActions.addMessage(arg));
  });

  const addNewChannel = (channel) => socket.emit('newChannel', channel)
  socket.on('newChannel', (arg) => {
    configure.dispatch(channelsActions.addChannel(arg));
  });

  const removeChannel = (id) => socket.emit('removeChannel', { id })
  socket.on('removeChannel', (arg) => {
    configure.dispatch(channelsActions.removeChannel(arg));
  });

  const renameChannel = (renamedChannel) => socket.emit('renameChannel', renamedChannel)
  socket.on('renameChannel', (arg) => {
    const { name, id } = arg;
    configure.dispatch(channelsActions.changeChannelName({ id, changes: { name, }, }));
  });

  return {
    addNewMessage,
    addNewChannel,
    removeChannel,
    renameChannel,
  };
};

export default buildtSocketApi;
