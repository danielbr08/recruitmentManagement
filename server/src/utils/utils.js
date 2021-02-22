
const getPersonalNumbersFromSoldiers = async (soldiers)=>{
    personalNumbers = "";
    await soldiers.forEach(element => {
      let personalNumber = element.personalNumber;
      personalNumbers += `'${personalNumber}',`;
    });
    return personalNumbers.substr(0,personalNumbers.length-1);
  }

  const getNamesListSoldiersMap = async (soldiers)=>{
    const namesListSoldiersMap = {};
    await soldiers.forEach(soldier => {
      namesListSoldiersMap[soldier.personalNumber] = soldier;
    });
    return namesListSoldiersMap;
  }

  const removeLastCharacters = (str, size)=>{
    return str.substr(0, str.length-size);// remove last unnecessary ',' character
  }


  module.exports = {
    getPersonalNumbersFromSoldiers,
    removeLastCharacters,
    getNamesListSoldiersMap
  };