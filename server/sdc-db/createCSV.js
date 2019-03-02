const fileSystem = require('fs');
const csvWriter = require('csv-write-stream');
const headers = ['res_id', 'type', 'category', 'name', 'description', 'price'];
// { default options
//   separator: ',',
//   newline: '\n',
//   headers: undefined,
//   sendHeaders: true
// }
const Readable = require('stream').Readable;
const readStream = new Readable({
  objectMode: true
});

const type = [
  'Breakfast',
  'Lunch',
  'Dinner',
  'Dessert',
  'Take Out',
  'Drinks',
  'Wines',
  'Coctails',
  'Bar'
];

const category = [
  'Bites',
  'Breads',
  'Small Plates',
  'Large Plates',
  'Sides',
  'Vegetables',
  'Salads',
  'Sandwiches',
  'Entrees',
  'Deserts',
  'Pasta',
  'Fowl',
  'Beef',
  'Veal',
  'Mains',
  'Cold',
  'Snacks',
  'Raw',
  'Soups'
];

const description = [
  'A light yoghurt made with saffron and fresh kiwi fruit',
  'A crunchy salad featuring pepperoni and dried parsley',
  'A crunchy salad featuring fresh chickpea and baby courgette',
  'Fresh redcurrant and horseradish served on a bed of lettuce',
  'A crunchy salad featuring fresh juniper berry and cashew',
  'Fresh damson and jasmine served on a bed of lettuce',
  'Cornmeal and peppermint served on a bed of lettuce',
  'A crisp salad featuring peanut and halibut',
  'Gochu jang and piccalilli served on a bed of lettuce',
  'Fresh beetroot and ruby grapefruit served on a bed of lettuce',
  'A crisp salad featuring toenjang and irish whiskey',
  'A crisp salad featuring button mushroom and fresh jalape',
  'Bean and prosciutto served on a bed of lettuce',
  'A crunchy salad featuring fresh chamomile and venison',
  'Lea bacon and flaxseed oil served on a bed of lettuce',
  'Pork sausage meat and tuna served on a bed of lettuce',
  'A crunchy salad featuring tumeric and buckwheat',
  'A crunchy salad featuring fresh chilli and mascarpone',
  'Marinaded tofu and italian dressing served on a bed of lettuce',
  'Tripe and cider vinegar served on a bed of lettuce',
  'Sharon fruit and fresh cherimoya served on a bed of lettuce',
  'A crunchy salad featuring cumin seeds and smoked salmon',
  'Kalonji and sweet dessert wine served on a bed of lettuce',
  'Black mustard seeds and red cabbage served on a bed of lettuce',
  'A crisp salad featuring fresh potato and chervil',
  'A crunchy salad featuring swordfish and fried paneer',
  'A crunchy salad featuring Spanish chorizo and ostrich',
  'Pecan and baby onion served on a bed of lettuce',
  'A crisp salad featuring fresh longan and mandarin',
  'A crunchy salad featuring fresh jerusalem artichoke and acorn squash',
  'A crisp salad featuring galliano and fresh mint',
  'Limpa and fresh cranberries served on a bed of lettuce',
  'Fresh mangetout and spring onion served on a bed of lettuce',
  'Fresh quinoa and adobo seasoning served on a bed of lettuce',
  'Mizuna and rainbow trout served on a bed of lettuce',
  'Socca and tiger prawns served on a bed of lettuce',
  'A crisp salad featuring fresh marrow and pheasant',
  'A crisp salad featuring plum sauce and vinegar',
  'A crisp salad featuring fresh cucumber and canned corned beef',
  'A crunchy salad featuring fresh jujube and wensleydale',
  'A crisp salad featuring fresh star fruit and loquat',
  'A crunchy salad featuring hp sauce and fresh spaghetti squash',
  'Dulse and kaffir lime leaf served on a bed of lettuce',
  'A crisp salad featuring fresh ugli fruit and eel',
  'Bouquet garni and gorgonzola served on a bed of lettuce',
  'Radiatori and emu served on a bed of lettuce',
  'A crisp salad featuring le roule cheese and caviar',
  'Free-range turkey and duck served on a bed of lettuce',
  'A crunchy salad featuring angelica and pork tenderloin',
  'A crunchy salad featuring haroset and pollock',
  'Spaghetti and edam served on a bed of lettuce',
  'Instant coffee powde and cherry tomato served on a bed of lettuce',
  'A crisp salad featuring garlic powder and pumpkin seeds',
  'Fresh cloudberry and stilton served on a bed of lettuce',
  'A crunchy salad featuring dill and fresh blackcurrant',
  'Fresh shallot and tamarillo served on a bed of lettuce',
  'A crisp salad featuring weetabix and granny smith apple',
  'Poussin and italian seasoning served on a bed of lettuce',
  'A crisp salad featuring gurnard and millet',
  'Squid and pork served on a bed of lettuce',
  'A crunchy salad featuring smoked haddock and costmary',
  'Phyllo and fresh water chestnut served on a bed of lettuce',
  'A crisp salad featuring rice paper and dried rosemary',
  'Cornstarch and fresh delicata served on a bed of lettuce',
  'A crisp salad featuring nasturtium and potato starch',
  'Crab and fresh daikon served on a bed of lettuce',
  'Fresh elderberry and sultana served on a bed of lettuce',
  'A crunchy salad featuring fresh mozzarella and currant',
  'Savoy cabbage and thyme served on a bed of lettuce',
  'A crisp salad featuring urid dal and chinese cabbage',
  'A crunchy salad featuring orange flower water and vermicelli',
  'Fresh arugula and kelp powder served on a bed of lettuce',
  'Fresh blueberry and raspberry vinegar served on a bed of lettuce',
  'Fresh rambutan and plum tomatoes served on a bed of lettuce',
  'A crisp salad featuring fresh lobster and pollack',
  'A crisp salad featuring jaggery and ragu',
  'A crisp salad featuring veal and bocconcini',
  'A crisp salad featuring smoked cheese and fresh yam',
  'A crunchy salad featuring fresh boysenberry and skate',
  'Grappa and bison served on a bed of lettuce',
  'A crisp salad featuring coconut milk and crunchy date',
  'A crunchy salad featuring shrimp and marsala',
  'A crisp salad featuring fresh raisin and calamari',
  'Chinese cabbage and kielbasa served on a bed of lettuce',
  'Cham and roasted chestnut served on a bed of lettuce',
  'Romaine lettuce and fresh raspberry served on a bed of lettuce',
  'A crisp salad featuring fresh borlotti bean and tongue',
  'Tubetti and masa harina served on a bed of lettuce',
  'Fresh kale and minced lamb served on a bed of lettuce',
  'A crisp salad featuring kirschwasser and hazelnut',
  'A crisp salad featuring green cabbage and licorice',
  'A crisp salad featuring dried tarragon and fresh thai basil',
  'A crunchy salad featuring pecorino and fettuccine',
  'A crisp salad featuring anchovy and cialledda',
  'Denjang and mussel served on a bed of lettuce',
  'A crisp salad featuring hogget and john dory',
  'A crunchy salad featuring olive and tia maria',
  'Goat cheese and wheat served on a bed of lettuce',
  'Chicory and shellfish served on a bed of lettuce',
  'A crunchy salad featuring cheddar cheese and cocoa'
];

const name = [
  'mushrooms',
  'peas',
  'sazon',
  'tomatoes',
  'cookies',
  'artificial sweetener',
  'bean sprouts',
  'garlic powder',
  'cantaloupes',
  'chives',
  'croutons',
  'cream of tartar',
  'chestnuts',
  'grits',
  'sauerkraut',
  'parsnips',
  'lemon juice',
  'heavy cream',
  'chai',
  'ale',
  'baguette',
  'condensed milk',
  'flour',
  'brussels sprouts',
  'veal',
  'kumquats',
  'lettuce',
  'lentils',
  'cauliflower',
  'kidney beans',
  'turtle',
  'white beans',
  'salt',
  'bagels',
  'celery',
  'almonds',
  'catfish',
  'ricotta cheese',
  'pumpkin seeds',
  'chocolate',
  'brazil nuts',
  'pecans',
  'corn',
  'bay leaves',
  'jicama',
  'onions',
  'red beans',
  'Tabasco sauce',
  'Goji berry',
  'honeydew melons',
  'mozzarella',
  'red snapper',
  'blue cheese',
  'apples',
  'unsweetened chocolate',
  'pecans',
  'alfredo sauce',
  'guavas',
  'black-eyed peas',
  'tortillas',
  'margarine',
  'sushi',
  'bay leaves',
  'capers',
  'rice paper',
  'alligator',
  'pomegranates',
  'Havarti cheese',
  'poppy seeds',
  'cheddar cheese',
  'cactus',
  'pickles',
  'oatmeal',
  'olive oil',
  'tonic water',
  'molasses',
  'Worcestershire sauce',
  'shallots',
  'garlic',
  'mesclun greens',
  'curry powder',
  'trout',
  'curry leaves',
  'barley sugar',
  'adobo',
  'tuna',
  'bacon grease',
  'eggs',
  'bard',
  'fennel',
  'butter',
  'clams',
  'chile peppers',
  'red beans',
  'black beans',
  'leeks',
  'romaine lettuce',
  'pumpkins',
  'cocoa powder',
  'tomato paste',
  'Caprese Zucchini Noodle Salad',
  'Chipotle Chicken Grilled Cheese',
  'Mediterranean Crab',
  'Chicken Fajita Casserole',
  'Birds Nest Egg Salad',
  'Caprese Mac and Cheese',
  'Faggots with onion gravy',
  'Low Carb Peanut Butter',
  'Super Mom Stir Fry',
  'Penne Beef',
  'Flattened Chicken',
  'Pork Chops Romano',
  'Grilled chicken with chilli',
  'Coconut Pound Cake',
  'Steak Sandwiches',
  'Chicken and Corn Chowder',
  'Creamy Green Chile',
  'Healthy Chicken Burgers',
  'Grilled Pork Chops',
  'Shepherds Pie',
  'Fruit Salad',
  'Slow-Cooker',
  'Spinach',
  'Pan-seared Salmon',
  'Snapper',
  'Chicken Fajita Burgers',
  'Chicken Cacciatore',
  'Guinea fowl tagine',
  'Skinnified Pork',
  'Salmon Sandwiches with Fries',
  'Stir-Fried Udon',
  'Instant Pot Turkey Chili',
  'The TJ Hooker Pizza',
  'Slow Cooker',
  'Beef Curry',
  'Pork Tacos',
  'Roasted Summer',
  'Grilled Watermelon Salad',
  'Mexican Chicken',
  'Coconut',
  'Cheesy Chicken',
  'Sweet Thai Shrimp Curry',
  'Roasted Garlic Macaroni and Cheese',
  'One Pot Garlic Butter Chicken',
  'Slow Cooker Chicken',
  'Grilled Chicken',
  'Kale Pesto Avocado',
  'Slow Cooker Meatball Subs',
  'Contest-Winning',
  'Chicken Salad',
  'Seared Scallops',
  'Skirt Steak',
  'Almond-Thyme-Crusted Mahi Mahi',
  'Seared Short Rib',
  'Creamy Baked Risotto',
  'Creamy chicken & mango curry',
  'Smoked Salmon',
  'Spinach Burrata',
  'Golden Beet',
  'Cornmeal-Crusted Catfish',
  'Minty carrot',
  'Bang-Bang Shrimp',
  'Pan-Seared Cod',
  'Slow Cooker Coq au Vin',
  'Calamari',
  'Homemade Creamy',
  'Avocado BLT',
  'Oven Baked Chicken Tacos',
  'Thai Peanut Chicken',
  'Tofu Kabobs',
  'Greek pasta salad',
  'Tacos',
  'Ravioli',
  'French Toast',
  'Coleslaw',
  'Porridge',
  'Fried Egg',
  'Bratkartoffeln',
  'Chicken Nuggets',
  'Mashed Potato',
  'Mashed Potato',
  'Wrap',
  'Lasagne',
  'Egg Fried Rice',
  'Spaghetti Bolognese',
  'Cucumber Salad',
  'Spaetzle',
  'Quesadilla',
  'Scallops',
  'Ravioli',
  'Tiramisu',
  'Couscous',
  'Antipasto',
  'French Toast',
  'Ratatouille',
  'Bratwurst',
  'Chicken Nuggets',
  'Barbecue',
  'Chicken Noodle Soup',
  'Apple Pie'
];

const makeTypeList = function(type) {
  const random = () => {
    let num = ~~(Math.random() * type.length);
    return num;
  };
  let qty = ~~(Math.random() * 3) + 1;
  let menus = [];
  while (menus.length !== qty) {
    let choice = random();
    if (!menus.includes(type[choice])) {
      menus.push(type[choice]);
    }
  }
  return menus;
};

const makeCategoryList = function(cat) {
  const randomMax = (max) => (~~(Math.random() * max) + 1);
  const qty = randomMax(3);
  const list = [];
  while (list.length !== qty) {
    let choice = cat[randomMax(cat.length - 1)];
    if (!list.includes(choice)) {
      list.push(choice);
    }
  }
  return list;
};

const makeMenuList = function(name, description) {
  const randomMax = (max) => (~~(Math.random() * max) + 1);
  const nameList = [];
  const descList = [];
  const list = [];
  const qty = randomMax(6);
  while (nameList.length !== qty) {
    let choice = name[randomMax(name.length - 1)];
    if (!nameList.includes(choice)) {
      nameList.push(choice);
    }
  }
  while (descList.length !== qty) {
    let choice = description[randomMax(description.length - 1)];
    if (!descList.includes(choice)) {
      descList.push(choice);
    }
  }
  for (let i = 0; i < nameList.length; i++) {
    list.push({name: nameList[i], description: descList[i]});
  }
  return list;
};

const makeMenu = function(id) {
  const Menu = [];
  const typeList = makeTypeList(type);
  for (let type = 0; type < typeList.length; type++) {
    const categoryList = makeCategoryList(category);
    for (let cat = 0; cat < categoryList.length; cat++) {
      const menuList = makeMenuList(name, description);
      for (let menu = 0; menu < menuList.length; menu++) {
        Menu.push([
          id,
          typeList[type],
          categoryList[cat],
          menuList[menu].name,
          menuList[menu].description,
          ((Math.random() * 10000) / 100).toFixed(2)
        ]);
      }
    }
  }
  return Menu;
};

const streamData = function() {
  const writer = csvWriter({headers: headers});
  const outputStream = fileSystem.createWriteStream(__dirname + '/test-data2.csv');

  const start = new Date();
  const qty = 100;
  const multiplier = 1;
  let index = 0;

  readStream._read = function() {
    let restaurantMenu = makeMenu(index);

    if (index % multiplier === 0) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(`Processing ${index / multiplier}%, elapsed ${((new Date() - start) / (1000 * 60)).toFixed(2)} minutes`);
    }

    for (let i = 0; i < restaurantMenu.length; i++) {
      readStream.push(restaurantMenu[i]);
    }
    if (index === 100 * multiplier) {
      readStream.push(null);
    }
    index++;
  };

  readStream.pipe(writer).pipe(outputStream);
  outputStream.on(
    'finish',
    function handleFinish() {
      console.log('');
      console.log('CSVStream serialization complete! in ', (( new Date() - start) / (1000 * 60)).toFixed(1), 'minutes');
    }
  );
};

streamData();
