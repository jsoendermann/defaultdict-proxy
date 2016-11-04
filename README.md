# JavaScript defaultdict

This is a port of [python's defaultdict](https://docs.python.org/2/library/collections.html#defaultdict-objects) to JavaScript. It uses proxies to create objects that return values other than ```undefined``` for attributes that haven't yet been set.

**This package needs native [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) support to work.** 

## Install
```yarn add defaultdict-proxy```

## Usage
If called with ```undefined```, ```null```, a boolean, number, string or symbol, ```defaultdict``` returns a proxy object that returns this value for unset attributes. If called with an array or object, accessing unset attributes returns a shallow copy of the array or object. If ```defaultdict``` is given a function, it returns a proxy object that has unset attributes initialized to the result of executing the function.

```javascript
import defaultdict from 'defaultdict-proxy';

// This defaultdict returns fresh empty arrays for unset attributes
const dd1 = defaultdict([]);

// defaultdicts act like normal objects
dd1.a = { b: 0 };
dd1.a.b === 0; // true

// We can use attributes without setting them first
dd1.b.push(42);
dd1.b; // [42]
dd1.c; // []
dd1.d === dd1.e; // false, every attribute gets its own copy

// A defaultdict that initializes unset attributes with the time of their
// first access
const dd2 = defaultdict(() => new Date());

// The attribute initialization function is given the name of the attribute
// as a parameter. This defaultdict initializes unset attributes to their
// name
const dd3 = defaultdict(attr => attr);
dd3.blah // 'blah'

// To create defaultdicts that initialize unset attributes with functions,
// we have to pass defaultdict a higher order function. In this example,
// unset attribute accesses return the identity function. 
const dd4 = defaultdict(() => x => x);
```

## License
MIT