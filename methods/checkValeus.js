const checkValues = function(item) {
  if (item.state !== '') {
    item.state.replace('Usado - ', '');
    item.state.replace('Novo - ', '');
  } else {
    item.state = null;
  }
  if (item.store !== '') {
    item.store = item.store.replace('por ', '');
  } else {
    item.store = null;
  }
  return item;
};

module.exports = checkValues;
