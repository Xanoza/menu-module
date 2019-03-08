# Basic query

## PostgreSQL:
#### Search by ID:

```
restaurants=# select * from menus where res_id=88888;
   id    | res_id |    type    |   category   |              name              |                          description                           | price
---------+--------+------------+--------------+--------------------------------+----------------------------------------------------------------+--------
 1245672 |  88888 | Coctails   | Small Plates | Mashed Potato                  | Fresh redcurrant and horseradish served on a bed of lettuce    | 21.37
 1245673 |  88888 | Coctails   | Small Plates | baguette                       | A crisp salad featuring gurnard and millet                     | 72.65
 1245674 |  88888 | Coctails   | Small Plates | kumquats                       | Phyllo and fresh water chestnut served on a bed of lettuce     | 13.67
 1245675 |  88888 | Coctails   | Small Plates | oatmeal                        | Black mustard seeds and red cabbage served on a bed of lettuce | 85.86
 1245676 |  88888 | Coctails   | Small Plates | Almond-Thyme-Crusted Mahi Mahi | A crisp salad featuring veal and bocconcini                    | 53.35
 1245677 |  88888 | Coctails   | Breads       | Ravioli                        | A crisp salad featuring le roule cheese and caviar             | 84.76
 1245678 |  88888 | Coctails   | Cold         | Instant Pot Turkey Chili       | A crunchy salad featuring fresh mozzarella and currant         | 31.03
 1245679 |  88888 | Coctails   | Cold         | pumpkins                       | A crunchy salad featuring olive and tia maria                  | 0.07
 1245680 |  88888 | Coctails   | Cold         | bay leaves                     | Dulse and kaffir lime leaf served on a bed of lettuce          | 70.35
 1245681 |  88888 | Dessert    | Sandwiches   | Penne Beef                     | Radiatori and emu served on a bed of lettuce                   | 13.73
 1245682 |  88888 | Dessert    | Sandwiches   | celery                         | Free-range turkey and duck served on a bed of lettuce          | 25.50
(11 rows)

Time: 5.281 ms
```

#### Search by String:
```
restaurants=# select * from menus where res_id=93 and type='Lunch';
  id  | res_id |    type    |   category   |             name             |                         description                         | price
------+--------+------------+--------------+------------------------------+-------------------------------------------------------------+--------
 1295 |     93 | Lunch      | Small Plates | Creamy chicken & mango curry | A crisp salad featuring fresh marrow and pheasant           | 92.88
 1296 |     93 | Lunch      | Small Plates | Sweet Thai Shrimp Curry      | Chinese cabbage and kielbasa served on a bed of lettuce     | 69.45
 1297 |     93 | Lunch      | Small Plates | Lasagne                      | A crisp salad featuring plum sauce and vinegar              | 71.67
 1298 |     93 | Lunch      | Snacks       | cactus                       | A crunchy salad featuring fresh chickpea and baby courgette | 82.99
 1299 |     93 | Lunch      | Breads       | Sweet Thai Shrimp Curry      | A crisp salad featuring urid dal and chinese cabbage        | 75.80
 1300 |     93 | Lunch      | Breads       | Pork Tacos                   | Fresh kale and minced lamb served on a bed of lettuce       | 1.27
 1301 |     93 | Lunch      | Breads       | kidney beans                 | A crisp salad featuring fresh borlotti bean and tongue      | 27.21
(7 rows)

Time: 1.530 ms

```

## MongoDB:
#### Search by ID:

```
> db.menus.find({res_id: 88888})
{ "_id" : ObjectId("5c7b24d529ee031172e46eaf"), "res_id" : 88888, "type" : "Take Out", "cat" : "Vegetables", "name" : "Grilled chicken with chilli", "desc" : "Fresh beetroot and ruby grapefruit served on a bed of lettuce", "price" : "68.70" }
{ "_id" : ObjectId("5c7b24d529ee031172e46eb0"), "res_id" : 88888, "type" : "Take Out", "cat" : "Vegetables", "name" : "Almond-Thyme-Crusted Mahi Mahi", "desc" : "Black mustard seeds and red cabbage served on a bed of lettuce", "price" : "14.24" }
{ "_id" : ObjectId("5c7b24d529ee031172e46eb1"), "res_id" : 88888, "type" : "Take Out", "cat" : "Vegetables", "name" : "Antipasto", "desc" : "Tripe and cider vinegar served on a bed of lettuce", "price" : "65.69" }
{ "_id" : ObjectId("5c7b24d529ee031172e46eb2"), "res_id" : 88888, "type" : "Take Out", "cat" : "Vegetables", "name" : "Caprese Zucchini Noodle Salad", "desc" : "A crisp salad featuring plum sauce and vinegar", "price" : "11.22" }
>


"executionStats" : {
    "executionSuccess" : true,
    "nReturned" : 4,
    "executionTimeMillis" : 0,
    "totalKeysExamined" : 4,
    "totalDocsExamined" : 4,
    "executionStages" : {
```

#### Search by String:
```
> db.menus.find({res_id: 93, type:"Lunch"})
{ "_id" : ObjectId("5c7b24c129ee031172d1617d"), "res_id" : 93, "type" : "Lunch", "cat" : "Entrees", "name" : "tonic water", "desc" : "Dulse and kaffir lime leaf served on a bed of lettuce", "price" : "52.38" }
{ "_id" : ObjectId("5c7b24c129ee031172d1617e"), "res_id" : 93, "type" : "Lunch", "cat" : "Entrees", "name" : "Faggots with onion gravy", "desc" : "A crunchy salad featuring smoked haddock and costmary", "price" : "5.14" }
{ "_id" : ObjectId("5c7b24c129ee031172d1617f"), "res_id" : 93, "type" : "Lunch", "cat" : "Entrees", "name" : "tomato paste", "desc" : "A crisp salad featuring fresh potato and chervil", "price" : "95.06" }
{ "_id" : ObjectId("5c7b24c129ee031172d16180"), "res_id" : 93, "type" : "Lunch", "cat" : "Pasta", "name" : "Barbecue", "desc" : "A crisp salad featuring weetabix and granny smith apple", "price" : "13.78" }
{ "_id" : ObjectId("5c7b24c129ee031172d16181"), "res_id" : 93, "type" : "Lunch", "cat" : "Pasta", "name" : "Spaetzle", "desc" : "Fresh arugula and kelp powder served on a bed of lettuce", "price" : "82.92" }
{ "_id" : ObjectId("5c7b24c129ee031172d16182"), "res_id" : 93, "type" : "Lunch", "cat" : "Pasta", "name" : "Caprese Zucchini Noodle Salad", "desc" : "A crunchy salad featuring smoked haddock and costmary", "price" : "69.78" }
{ "_id" : ObjectId("5c7b24c129ee031172d16183"), "res_id" : 93, "type" : "Lunch", "cat" : "Pasta", "name" : "chai", "desc" : "A crisp salad featuring fresh longan and mandarin", "price" : "34.27" }
{ "_id" : ObjectId("5c7b24c129ee031172d16184"), "res_id" : 93, "type" : "Lunch", "cat" : "Pasta", "name" : "Bratwurst", "desc" : "A crunchy salad featuring fresh chilli and mascarpone", "price" : "3.94" }
{ "_id" : ObjectId("5c7b24c129ee031172d16185"), "res_id" : 93, "type" : "Lunch", "cat" : "Pasta", "name" : "alligator", "desc" : "Goat cheese and wheat served on a bed of lettuce", "price" : "73.13" }
{ "_id" : ObjectId("5c7b24c129ee031172d16186"), "res_id" : 93, "type" : "Lunch", "cat" : "Sides", "name" : "Slow Cooker Chicken", "desc" : "A crunchy salad featuring shrimp and marsala", "price" : "76.63" }
{ "_id" : ObjectId("5c7b24c129ee031172d16187"), "res_id" : 93, "type" : "Lunch", "cat" : "Sides", "name" : "Goji berry", "desc" : "A crisp salad featuring fresh borlotti bean and tongue", "price" : "57.69" }
{ "_id" : ObjectId("5c7b24c129ee031172d16188"), "res_id" : 93, "type" : "Lunch", "cat" : "Sides", "name" : "Chicken Noodle Soup", "desc" : "A crunchy salad featuring fresh chickpea and baby courgette", "price" : "61.68" }
{ "_id" : ObjectId("5c7b24c129ee031172d16189"), "res_id" : 93, "type" : "Lunch", "cat" : "Sides", "name" : "mozzarella", "desc" : "Instant coffee powde and cherry tomato served on a bed of lettuce", "price" : "99.60" }
{ "_id" : ObjectId("5c7b24c129ee031172d1618a"), "res_id" : 93, "type" : "Lunch", "cat" : "Sides", "name" : "Bratwurst", "desc" : "A crisp salad featuring anchovy and cialledda", "price" : "97.83" }
{ "_id" : ObjectId("5c7b24c129ee031172d1618b"), "res_id" : 93, "type" : "Lunch", "cat" : "Sides", "name" : "croutons", "desc" : "A crisp salad featuring fresh longan and mandarin", "price" : "25.48" }
>

"executionStats" : {
    "executionSuccess" : true,
    "nReturned" : 15,
    "executionTimeMillis" : 0,
    "totalKeysExamined" : 28,
    "totalDocsExamined" : 28,
    "executionStages" : {
```

