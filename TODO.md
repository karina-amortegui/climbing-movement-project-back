# General Todos

[X] Install and Configure Typescript
[X] Install Zod or Yup for request validation (verify if all of our data from the frontend is given to us)

[X] If we need types create a type folder/file and add the generic/general types that multiple files use

# movement.controller.js

[ ] For each of the controller functions add Zod/Yup validation for each request - createMovement - getMovments - getMovementById - updateMovement - deleteMovement

# FEATURES

[ ] Photo Integration - adding in photos to pages - public images (url) | Do now - image taken or from credit them

    - Hosting your own images | Implement Later
        - MongoDB has built in image storage (buckets) fsGrid
        - Image Compression (compress image before storing it)
        - public facing url to that image: https://xjibj.co

# 11.9.26

1. need to add displayName to Mongoose schema
2. run script to add in the PATCH on all movements

const getMovements = await getAllMovements();

for (let i = 0; i < getMovements.data.length; i++) {
// extract id =>
const current = getMovements.data[i]
current.\_id // extracted Id

need to make PATCH request

- need to make note of what youre calling movementName now \*\*
  example -> movementName -> rock_over -> Rock Over

create simple algo for this -> movementName[0].toUpperCase() + movementName.slice(1)

find indexes of underscores

replace those indexes with <space> and after that space should be uppercased

const updateMovement = await updateMovementById(current.\_id, body)
}

Example:
karina_hottinger

Karina Hottinger
let original = "karina_hottinger";

original[0] -> "k"
original[0].toUpperCase() -> "K"
original.slice(1)
origina.slice(1) - "arina*hottinger"
original =
original.indexOf("*")
original.replace(origina.indexOf("\_"), " ")
original[original.indexOf(" ") + 1).toUppercase()

function arithmeticSequenceElements(a, d, n) {
// initialize array -> empty array -> []
const sequence = [];

// [1, 3, 5, 7, 9]

// a - 1
// d - 2
// n - 5

for (let i = 0; i < 5; i++) {
// i = 5
// a - 11
sequence.push(a);
a += d;
}
// [1, 3, 5, 7, 9] -> ", " 1 + ", " + 3 + ", " + 5 + ", " + 7 + ", " + 9 = "1, 3, 5, 7, 9"
return sequence.join(", "); //join - array --> string
}

arithmeticSequenceElements(1, 2, 5);
