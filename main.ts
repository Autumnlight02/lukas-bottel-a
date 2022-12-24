import * as fs from 'fs';

const people = fs.readdirSync('./images');

const dataRows: { name: string; slug: string; files: string[] }[] = [];

for (let i = 0; i < people.length; i++) {
  const curr = people[i];

  const [folder] = fs
    .readdirSync('./images/' + curr + '/')
    .filter((e) => fs.lstatSync('./images/' + curr + '/' + e).isDirectory());

  const files = fs.readdirSync('./images/' + curr + '/' + folder);
  //   console.log(files);

  const dataRow = {
    name: curr,
    slug: curr.toLowerCase(),
    files: files,
  };
  dataRows.push(dataRow);
}

let finalString = `Name,Slug,Collection ID,Item ID,Created On,Updated On,Published On,multiImg1,multiImg2,multiImg3,multiImg4,multiImg5\n`;
dataRows.forEach((e) => {
  let Arrays: string[][] = [];
  while (e.files.length > 25) {
    Arrays.push(e.files.splice(0, 25));
  }
  //   console.log(Arrays);
  let fireBaseString = 'Firebase';
  let str = fireBaseString;
  Arrays.forEach((e) => {
    str += e.join(';');
    str += ',';
  });
  str = replaceAll(str, ';', ';' + fireBaseString);

  finalString += `${e.name},${e.slug},63a6d7659e85367cf4b74203,63a6d76d90b0ca1b34acd3c3,Sat Dec 24 2022 10:41:49 GMT+0000 (Coordinated Universal Time),Sat Dec 24 2022 10:41:49 GMT+0000 (Coordinated Universal Time),,${str}\n`;
});
fs.writeFileSync('./result.csv', finalString, 'utf-8');

function replaceAll(str: string, find: string, replace: string) {
  return str.replace(new RegExp(find, 'g'), replace);
}
