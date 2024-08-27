
#### 1. Explain why `{ a: 1 } === { a: 1 }` is `false` in JavaScript

Comparisons in JavaScript on non-primatives or reference types are not checking value equality, they check identity equality. Reference variables point to where the value is stored in memory while primatives store the value as the variable. This means primatives are immutable and are compared by value. In the example, the two objects are declared within the statement so the two references will point to two different parts of memory and therefore are not equal.