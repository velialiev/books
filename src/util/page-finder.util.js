const getItemPage = (itemToFind, list, idPropertyName, itemsPerPage) => {
  for (let i = 0; i < list.length; i += itemsPerPage) {
    const result = list.slice(i, i + itemsPerPage)
    .find(i => i[idPropertyName] === itemToFind[idPropertyName]);

    if (result) {
      return i / itemsPerPage;
    }
  }
};

export default getItemPage;
