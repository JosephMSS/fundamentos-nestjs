const myName = 'Joseph';
const myAge = 27;
const sum = (a: number, b: number) => a + b;
sum(1, 2);
class Person {
  constructor(private name: string, private age: number) {}
  getSummary() {
    return `My name is ${this.name}, I am ${this.age} years old.`;
  }
}

const person = new Person(myName, myAge);
console.log('🚀 ~ file: recap.ts:15 ~ person:', person.getSummary());
