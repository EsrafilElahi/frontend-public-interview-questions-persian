// =========================== Function Base ===========================

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

const nameInstance1 = nameFunc('esrafil');

console.log(nameInstance1.getName());
nameInstance1.setNewName('elahi');
console.log(nameInstance1.getName());
nameInstance1.setNewName('test');
console.log(nameInstance1.getName());
nameInstance1.resetName();
console.log(nameInstance1.getName());


// =========================== Class Base ===========================

class NameClass {
  constructor(initName) {
    this.defaultName = 'defaultName';
    this.initName = initName;
    this.name = initName || defaultName;
  }
  
  getName(){
    return this.name
  }
  
  setNewName(newName) {
    if(newName) {
      return this.name = newName;
    } else {
      throw new Error('the new name is required!')
    }
  }
  
  resetName() {
      return this.name = this.initName || this.defaultName
    }
}


const nameInstance = new NameClass('esrafil');

console.log(nameInstance.getName());
nameInstance.setNewName('elahi');
console.log(nameInstance.getName());
nameInstance.setNewName('test');
console.log(nameInstance.getName());
nameInstance.resetName();
console.log(nameInstance.getName());
