#### 4. Using typescript, what is the difference between an enum and an object?

An object is a data type in Javascript and therefore is usable in Typescript.

Enum's are an addition added in Typescript to allow for defining distinct values. While you can store the same values in a key-value pair in an object but enums have more benefits for their use-case. You can use the enum as a type and the value of a variable with this type will then be checked against the enum which allows you to limit the values to a known set of values and can't be set to an unexpected value which can happen in objects.