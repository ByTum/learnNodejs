const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('File not found');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('Can not write file');
      resolve('success');
    });
  });
};

const getPicDoc = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);
    // console.log(res.body.message);

    // await writeFilePro('dog-img.txt', res.body.message);
    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2 : READY 🐶';
};

(async () => {
  try {
    console.log('1 : will get dog pic');
    const x = await getPicDoc();
    console.log(x);
    console.log('3 : done getting dog pic');
  } catch (err) {
    console.log('ERROR 💥');
  }
})();

/*
console.log('1 : will get dog pic');
getPicDoc()
  .then((x) => {
    console.log(x);
    console.log('3 : done getting dog pic');
  })
  .catch((err) => {
    console.log('ERROR 💥');
  });
*/

/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`Breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message);
  })
  .then(() => {
    console.log('Random dog image saved to file!');
  })
  .catch((err) => {
    console.log(err);
  });
  */
