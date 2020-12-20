# url: /api/v1/house

## method: get

return all houses

# url: /api/v1/house/{id}

## method: get

return house by id

# url: /api/v1/house

## method: post

### body example
```json
{
  "card_id": "A001",
  "house_id": "11/01",
  "owner": "A",
  "routes": [
     "01A", "01B"
  ]
}
```

# url: /api/v1/car

## method: get

return all cars

# url: /api/v1/car/{id}

## method: get

return car by id

# url: /api/v1/car

## method: post

### body example
```json
{
    "house_id": "11/01",
    "car_id": "89"
}
```


# url: /api/v1/history

## method: get

return all histories

# url: /api/v1/history/{id}

## method: get

return history by id

# url: /api/v1/scan

## method: post

### body example
```json
{
    "car_id": "89"
}
```

# url: /api/v1/upload/{id}

## method: post

### body
```
image: _FILE_
```

# url: /api/v1/download/{id}

## method: get
