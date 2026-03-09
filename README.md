Answer of all questions:

1️⃣ What is the difference between var, let, and const?
Answer: Var is an older way of writing JavaScript that makes it hard to track where your data is coming from. It's better if we don't use it. var is function-scoped. We can change the value as many times as you want. We can even re-declare it. 

Let is changeable, reassignable but no re-declaring. It is block-based and stays inside bracket { }. It's a good one, we can write cleaner code using let.

Const is Block Scoped. Const is unique. We cannot reassign a const variable. Const behaves just like let when it comes to hoisting. In modern coding, we usually use const for everything by default.

2️⃣ What is the spread operator (...)?
Anaswer: spread operator is used for creating Array. It’s great for making a copy. This is super common when we want to update a user's profile without deleting their old info. It merges two arrays/objects and it can turns an array into a list of items.


3️⃣ What is the difference between map(), filter(), and forEach()?
Answer: map() is used to transform every element in an array. It runs a function on each element and returns a new array with the changed values.

filter() is used to select elements from an array based on a condition. It checks each element and returns a new array containing only the elements that meet the condition.

forEach() is used to loop through each element of an array and perform an action. It does not return a new array.

4️⃣ What is an arrow function?
Answer: Arrow Function is a shorter and simpler way to write functions in JavaScript. It's symbol is => . provide a short and clean syntax. They are often used in array methods like map(), filter(), and forEach().

5️⃣ What are template literals?
Answer: Template literals are a way to create strings in JavaScript using backticks ( ) instead of single (' ') or double (" ") quotes. It Supports multi-line strings.