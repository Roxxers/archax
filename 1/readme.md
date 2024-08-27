
#### 1. Explain why `{ a: 1 } === { a: 1 }` is `false` in JavaScript

Comparisons in JavaScript on non-primatives are not checking value equality, they check identity equality. While the two objects are the same in value they have different identities as they are defined seperately and therefore are not the same object. Thus creating that difference in identity. This does not cause issues for other data types such as strings or numbers as they are primative values.