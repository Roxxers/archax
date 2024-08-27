#### 5. Write a typescript variable declaration for a variable `a` that  will guarantee that it is a property name or key of object `b`

```ts
const b = {
  hello: "World",
  name: "Roxie"
};

let a: keyof typeof b;
// a can now only be a key of the object b
```