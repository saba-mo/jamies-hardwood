const {green, red} = require('chalk');
const {User, Product, Order} = require('../server/db/models');
const db = require('../server/db/');
const {Op} = require('sequelize');

const firstNames = [
  'Alice',
  'Bruno',
  'Cathy',
  'David',
  'Ellie',
  'Fanny',
  'George',
  'Hank',
  'Iris',
  'Jess',
  'Kelly',
  'Lor',
  'Manford',
  'Nigel',
  'Octavius',
  'Pickle',
  'Q',
  'Remmy',
  'Sal',
  'Tank',
  'Ursula',
  'Violet',
  'Wade',
  'Xena',
  'Yas',
  'Zoro',
  'Amos',
  'Dash',
  'Beam',
  'Jian',
  'Keen',
  'Boone',
  'Fox',
  'Sai',
  'Viotto',
];
const lastNames = [
  'Johnson',
  'Abernathy',
  'Confluence',
  'Rivers',
  'Cornelius',
  'Horn',
  'Crawford',
  'Crowfoot',
  'Cunningham',
  'Driscoll',
  'Ellis',
  'Benevolent',
  'Finch',
  'Swindle',
  'Menken',
  'Comforter',
  'Ninomae',
  'Simmons',
  'Victorious',
  'Undergrove',
  'Shrubs',
  'Tree',
  'Vandenberg',
  'Mountain',
  'Webb',
  'Abednego',
  'Cyprus',
  'Dagon',
  'Festus',
  'Griffin',
  'Lightfoot',
  'Luna',
  'Albertine',
  'Godfrey',
  'Royal',
  'Luz',
  'Greathouse',
  'Alastair',
  'Aphelion',
  'Callisto',
  'Gibbethon',
  'Nadir',
  'Sapphirus',
  'Omega',
  'Umbra',
];

const itemAdjective = [
  'fullness',
  'being plucky',
  'love',
  'power',
  'stickiness',
  'lustor',
  'vivacity',
  'ravishing',
  'beauty',
  'rad!',
  'bodaciousness',
  'brightness',
  'charm',
  'friends',
  'generosity',
  'sincerity',
  'imagination',
  'luck',
  'assistance',
  'sense',
  'romance',
  'manners',
  'being marvelous',
  'engagement',
  'mirth',
  'spectacularity',
  'glitz',
  'glistening',
  'dazzle',
  'twinkling',
  'vibrance',
  'glow',
  'gleaming',
  'sparkles',
  'brilliance',
  'elegance',
  'enchantment',
  'magnificence',
  'captivation',
  'charisma',
];

const emailHost = ['gmail', 'hotmail', 'yahoo'];
const userCount = 200;

// alternative way of approaching this is creating a variable just like the names e.g. const images = [`images from either urls or csv files`]
let bowlSmlImage = `https://i.pinimg.com/564x/ad/27/7c/ad277c3a5142ababf0ef14a81f91c168.jpg`;
let earringImage = `https://i.pinimg.com/564x/3a/7f/2a/3a7f2ac4d233443cb8c3486c33e0a271.jpg`;
let bowlLgImage = `https://i.pinimg.com/564x/30/6c/5e/306c5e4e0cc549575f623d176853bed6.jpg`;
let plateImage = `https://i.pinimg.com/564x/b3/3f/ca/b33fcae182c585100c62d57a2fa61584.jpg`;
let gobletImage = `https://i.pinimg.com/564x/ad/9a/b0/ad9ab0f61fca8b0629714c5ac6bb3826.jpg`;
let wkspImage = `https://i.pinimg.com/564x/1a/1c/c8/1a1cc8504f00e134d91ac9aef2713623.jpg`;
let ringImage = `https://i.pinimg.com/564x/fb/27/c3/fb27c35ab1981380eb871334c7ca820d.jpg`;
let npkImage = `https://i.pinimg.com/564x/61/34/a1/6134a1f2a344cb8b39a426c88a617a5a.jpg`;
let lightImage = `https://i.pinimg.com/564x/ca/6d/6b/ca6d6b623d6a7ce6ea99b3f64478ef59.jpg`;
let shelfImage = `https://i.pinimg.com/564x/76/b5/10/76b510f4c8811cd8011904b81c69117f.jpg`;

const users = async () => {
  for (let i = 0; i < 10; i++) {
    let first =
      firstNames[Math.floor(Math.random() * 1000) % firstNames.length];
    let last = lastNames[Math.floor(Math.random() * 1000) % lastNames.length];
    let host = emailHost[Math.floor(Math.random() * 1000) % emailHost.length];
    let email = `${first}.${last}@${host}.com`;
    try {
      await Promise.all([
        User.create(
          {
            firstName: first,
            lastName: last,
            email: email.toLowerCase(),
            isAdmin: true,
            password: 'password',
            order: {
              totalPrice: i * 2000,
            },
          },
          {
            include: [
              {
                association: User.Order,
              },
            ],
          }
        ),
      ]);
    } catch (error) {
      console.log('User Oops!', red(error));
    }
  }
  for (let i = 10; i < userCount; i++) {
    let first =
      firstNames[Math.floor(Math.random() * 1000) % firstNames.length];
    let last = lastNames[Math.floor(Math.random() * 1000) % lastNames.length];
    let host = emailHost[Math.floor(Math.random() * 1000) % emailHost.length];
    let email = `${first}.${last}@${host}.com`;
    try {
      await Promise.all([
        User.create(
          {
            firstName: first,
            lastName: last,
            email: email.toLowerCase(),
            password: 'password',
            order: {
              totalPrice: i * 2000,
            },
          },
          {
            include: [
              {
                association: User.Order,
              },
            ],
          }
        ),
      ]);
    } catch (error) {
      console.log('User Oops!', red(error));
    }
  }
};

const productEarrings = async () => {
  for (let i = 0; i < itemAdjective.length; i++) {
    let adjective = itemAdjective[i];
    let name = `Earrings of ${adjective}`;
    let description = 'Your ears will never be the same.';
    let quantity = Math.floor(Math.random() * 100);
    let price = Math.floor(Math.random() * 10000);
    try {
      await Promise.all([
        Product.create({
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          imageUrl: earringImage,
        }),
      ]);
    } catch (error) {
      console.log('Earring Oops!', red(error));
    }
  }
};

const productBowls = async () => {
  for (let i = 0; i < itemAdjective.length; i++) {
    let adjective = itemAdjective[i];
    let name = `Bowl of ${adjective}`;
    let description = 'This is the next thing you need to own!';
    let quantity = Math.floor(Math.random() * 100);
    let price = Math.floor(Math.random() * 10000);

    try {
      await Promise.all([
        Product.create({
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          imageUrl: bowlSmlImage,
        }),
      ]);
    } catch (error) {
      console.log('Bowl Oops!', red(error));
    }
  }
};

const productLrgBowls = async () => {
  for (let i = 0; i < itemAdjective.length; i++) {
    let adjective = itemAdjective[i];
    let name = `Large bowl of ${adjective}`;
    let description = 'Is this enough?!';
    let quantity = Math.floor(Math.random() * 100);
    let price = Math.floor(Math.random() * 10000);
    try {
      await Promise.all([
        Product.create({
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          imageUrl: bowlLgImage,
        }),
      ]);
    } catch (error) {
      console.log('Large Bowl Oops!', red(error));
    }
  }
};
const productPlates = async () => {
  for (let i = 0; i < itemAdjective.length; i++) {
    let adjective = itemAdjective[i];
    let name = `Plate of ${adjective}`;
    let description = 'Spread your food out here.';
    let quantity = Math.floor(Math.random() * 100);
    let price = Math.floor(Math.random() * 10000);

    try {
      await Promise.all([
        Product.create({
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          imageUrl: plateImage,
        }),
      ]);
    } catch (error) {
      console.log('Plate Oops!', red(error));
    }
  }
};
const productGoblets = async () => {
  for (let i = 0; i < itemAdjective.length; i++) {
    let adjective = itemAdjective[i];
    let name = `Goblet of ${adjective}`;
    let description = 'Drink your tasty beverages in style!';
    let quantity = Math.floor(Math.random() * 100);
    let price = Math.floor(Math.random() * 10000);

    try {
      await Promise.all([
        Product.create({
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          imageUrl: gobletImage,
        }),
      ]);
    } catch (error) {
      console.log('Goblet Oops!', red(error));
    }
  }
};
const productWorkSpace = async () => {
  for (let i = 0; i < itemAdjective.length; i++) {
    let adjective = itemAdjective[i];
    let name = `Workspace of ${adjective}`;
    let description = 'What do you need to do? Do it here!';
    let quantity = Math.floor(Math.random() * 100);
    let price = Math.floor(Math.random() * 10000);

    try {
      await Promise.all([
        Product.create({
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          imageUrl: wkspImage,
        }),
      ]);
    } catch (error) {
      console.log('WorkSpace Oops!', red(error));
    }
  }
};
const productRing = async () => {
  for (let i = 1; i < 8; i++) {
    let adjective = itemAdjective[i];
    let name = `Ring of ${adjective}`;
    let description = 'Why only get one when you can get two?';
    let quantity = Math.floor(Math.random() * 100);
    let price = Math.floor(Math.random() * 10000);

    try {
      await Promise.all([
        Product.create({
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          imageUrl: ringImage,
        }),
      ]);
    } catch (error) {
      console.log('Ring Oops!', red(error));
    }
  }
};
const productNapkinRing = async () => {
  for (let i = 0; i < itemAdjective.length; i++) {
    let adjective = itemAdjective[i];
    let name = `Rings of ${adjective} for your napkins`;
    let description = 'Jazz up that dinner table!';
    let quantity = Math.floor(Math.random() * 100);
    let price = Math.floor(Math.random() * 10000);

    try {
      await Promise.all([
        Product.create({
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          imageUrl: npkImage,
        }),
      ]);
    } catch (error) {
      console.log('Napkin Ring Oops!', red(error));
    }
  }
};
const productLight = async () => {
  for (let i = 0; i < itemAdjective.length; i++) {
    let adjective = itemAdjective[i];
    let name = `Light of ${adjective}`;
    let description = `Not just any light for your darkness, it's light of ${adjective}!`;
    let quantity = Math.floor(Math.random() * 100);
    let price = Math.floor(Math.random() * 10000);

    try {
      await Promise.all([
        Product.create({
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          imageUrl: lightImage,
        }),
      ]);
    } catch (error) {
      console.log('Light Oops!', red(error));
    }
  }
};
const productShelf = async () => {
  for (let i = 0; i < itemAdjective.length; i++) {
    let adjective = itemAdjective[i];
    let name = `Shelf of ${adjective}`;
    let description = `Records, books, towels, games, anything you want to store and display will fit perfectly on this shelf of ${adjective}.`;
    let quantity = Math.floor(Math.random() * 100);
    let price = Math.floor(Math.random() * 10000);

    try {
      await Promise.all([
        Product.create({
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          imageUrl: shelfImage,
        }),
      ]);
    } catch (error) {
      console.log('Shelf Oops!', red(error));
    }
  }
};

// this function is first finding some items already in the database, then associating them
async function associations() {
  // gives an array of objects that are newly created orders that meet the where condition
  let ordersToAssoc = await Order.findAll({
    where: {
      totalPrice: {
        [Op.or]: {
          [Op.between]: [22000, 80000],
        },
      },
    },
  });

  // gives an array of objects that are newly created products that meet the where condition
  // condition: where the name of the Product has this word in the string
  let productsToAssoc = await Product.findAll({
    where: {
      name: {
        [Op.or]: {
          [Op.like]: '%vivacity%',
          [Op.like]: '%generosity%',
          [Op.like]: '%being plucky%',
          [Op.like]: '%imagination%',
          [Op.like]: '%luck%',
        },
      },
    },
  });

  // associations loop
  let productIndex = 0;
  for (let i = 0; i < productsToAssoc.length; i++) {
    await ordersToAssoc[i].addProducts([productsToAssoc[productIndex]]);
    productIndex++;
  }
}

const seed = async () => {
  await db.sync({force: true});
  console.log(green('db synced!'));
  await productRing();
  await Promise.all([
    users(),
    productBowls(),
    productLrgBowls(),
    productGoblets(),
    productEarrings(),
    productLight(),
    productPlates(),
    productWorkSpace(),
    productNapkinRing(),
    productShelf(),
  ]);
  await associations();
};

async function runSeed() {
  console.log(green('seeding...'));
  try {
    await seed();
  } catch (error) {
    console.log('error seeding: ', red(error));
  }
}

// We've separated the `seed` function from the `runSeed` function. This way we can isolate the error handling and exit trapping. The `seed` function is concerned only with modifying the database.

// Execute the `seed` function, IF we ran this module directly (`node seed`).
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
