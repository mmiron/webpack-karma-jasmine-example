// import '@babel/polyfill';
const greetings = (name) => {
    return `hello ${name}`;
}
console.log(greetings('Steve'));

console.log('Hello world');

var array = [1, 2, 3];

Array.from(array).forEach(($item) => {
    console.log($item);
});