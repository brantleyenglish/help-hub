const objectToArray = (objectOfObjects: any) => {
  const newArray = [];
  for (const key in objectOfObjects) {
    if (objectOfObjects.hasOwnProperty(key)) {
      newArray.push({ ...objectOfObjects[key], id: key });
    }
  }
  return newArray;
};

export default objectToArray;
