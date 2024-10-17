const nameFunc = (initName) => {
  let name = initName || 'defaultName';
  
  return {
    getName: () => {
      return name;
    },
    
    setNewName: (newName) => {
      if(newName) {
        return name = newName; 
      } else {
        return name;
      }
    },
    
    resetName: () => {
      if(initName) {
        return name = initName;
      } else {
        return name = 'defaultName';  
      }
      
    }
  }
};

const nameInstance = nameFunc('esrafil');

console.log(nameInstance.getName());
nameInstance.setNewName('elahi');
console.log(nameInstance.getName());
nameInstance.setNewName('test');
console.log(nameInstance.getName());
nameInstance.resetName();
console.log(nameInstance.getName());
