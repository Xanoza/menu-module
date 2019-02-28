# Mesa Now


## Available API Routes

| Endpoint                        | Type   | Operation                           |
|---------------------------------|--------|-------------------------------------|
| '/api/:id'                      | GET    | Get all menus for restaurant id     |
| '/api/menu/new/menu'            | POST   | Create menu                         |
| '/api/menu/delete/menu'         | DELETE | Delete menu                         |
| '/api/menu/update/menu'         | PUT    | Change menu                         |
| '/api/menu/restaurant/:id/:type'| GET    | Get menus of type for restaurant id |


## Parameters:

- URL: `'/api/:id'`

  id=[integer]

  ```
  Data: [
    {
      id: INT,
      restaurant: STRING,
      name: STRING,
      type: STRING,
      description: STRING,
      price: STRING
    },
    {
      ...
    }
  ]
  ```

- URL: `'/api/menu/new/menu'`

```
  Data: {
    id: INT,
    restaurant: STRING,
    name: STRING,
    type: STRING,
    description: STRING,
    price: STRING
  }
  ```

- URL: `'/api/menu/delete/menu'`

```
  Data: {
    id: INT,
    restaurant: STRING,
    name: STRING
  }
  ```

- URL: `'/api/menu/update/menu'`

```
  Data: {
    id: INT,
    restaurant: STRING,
    name: STRING,
    type: STRING,
    description: STRING,
    price: STRING
  }
  ```

- URL: `'/api/menu/restaurant/:id/:type'`

    id=[integer]
    type=[string]

    ```
    Data: [
    {
      id: INT,
      restaurant: STRING,
      name: STRING,
      type: STRING,
      description: STRING,
      price: STRING
    },
    {
      ...
    }
  ]
  ```