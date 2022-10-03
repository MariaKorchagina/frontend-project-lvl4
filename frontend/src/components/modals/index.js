import Add from './Add.jsx';
import Delete from './Delete.jsx';
import Rename from './Rename.jsx';

const modals = {
  adding: Add,
  removing: Delete,
  renaming: Rename,
};

const getModal = (modalType) => modals[modalType];

export default getModal;