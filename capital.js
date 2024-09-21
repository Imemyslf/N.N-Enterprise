let fname = "kishan";
let newName = "";
for (let i = 0; i < fname.length; i++) {
  i === 0 ? (newName += fname[i].toUpperCase()) : (newName += fname[i]);
}

console.log(newName);
