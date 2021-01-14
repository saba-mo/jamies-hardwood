const {green, red} = require('chalk');
const {User, Product} = require('../server/db/models');
const db = require('../server/db/');

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
  'stickiness',
  'beauty',
  'rad!',
  'bodaciousness',
  'brightness',
  'charm',
  'friends',
  'generousity',
  'sincerity',
  'imagination',
  'luck',
  'assistance',
  'sense',
  'romance',
  'power',
  'manners',
  'being plucky',
  'beimg marvelous',
  'engagement',
  'mirth',
  'spectacularity',
  'stun',
  'glistening',
  'dazzle',
  'twinkling',
  'lustor',
  'vibrance',
  'vivacity',
  'glow',
  'gleaming',
  'sparkles',
  'brilliance',
  'elegance',
  'enchantment',
  'ravishing',
  'magnificence',
  'captivation',
  'love',
  'charisma',
];

const emailHost = ['gmail', 'hotmail', 'yahoo'];
const userCount = 200;
const productCount = 200;

// const images = [`images from either urls or csv files`]
let bowlImage = `https://images.crateandbarrel.com/is/image/Crate/CarsonMedBowl12inSHS18/$web_pdp_main_carousel_high$/190411134912/carson-medium-bowl.jpg`;
let earringImage = `https://cdn.shopify.com/s/files/1/0736/8211/products/Tear_Drop_Earring_Large_422x.png?v=1568803221`;

const users = async () => {
  for (let i = 0; i < userCount; i++) {
    let first =
      firstNames[Math.floor(Math.random() * 1000) % firstNames.length];
    let last = lastNames[Math.floor(Math.random() * 1000) % lastNames.length];
    let host = emailHost[Math.floor(Math.random() * 1000) % emailHost.length];
    let email = `${first}.${last}@${host}.com`;
    try {
      await Promise.all([
        User.create({
          firstName: first,
          lastName: last,
          email: email,
        }),
      ]);
    } catch (error) {
      console.log('UserOops!', red(error));
    }
  }
};

const productEarrings = async () => {
  for (let i = 0; i < productCount; i++) {
    let adjective =
      itemAdjective[Math.floor(Math.random() * 1000) % itemAdjective.length];
    let name = `Earrings of ${adjective}`;
    let description = 'This is the next thing you need to own!';
    let quantity = Math.floor(Math.random() * 100);
    let price = Math.random() * 100;
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
      console.log('EarringOops!', red(error));
    }
  }
};

const ProductBowls = async () => {
  for (let i = 0; i < productCount; i++) {
    let adjective =
      itemAdjective[Math.floor(Math.random() * 1000) % itemAdjective.length];
    let name = `Bowls of ${adjective}`;
    let description = 'This is the next thing you need to own!';
    let quantity = Math.floor(Math.random() * 100);
    let price = Math.random() * 100;

    try {
      await Promise.all([
        Product.create({
          name: name,
          description: description,
          quantity: quantity,
          price: price,
          imageUrl: bowlImage,
        }),
      ]);
    } catch (error) {
      console.log('BowlOops!', red(error));
    }
  }
};

const seed = async () => {
  await db.sync({force: true});
  console.log(green('db synced!'));
  users();
  productEarrings();
  ProductBowls();
};

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error('error seeding: ', red(err));
  }
}
if (module === require.main) {
  runSeed();
}

// We've separated the `seed` function from the `runSeed` function. This way we can isolate the error handling and exit trapping. The `seed` function is concerned only with modifying the database.

// Execute the `seed` function, IF we ran this module directly (`node seed`).
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
