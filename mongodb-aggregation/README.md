# MongoDB: Aggregation Pipeline

### Problem
Calculate the total revenue and average item price per store per month from a sales collection.

### How to Run
Use this pipeline in MongoDB Compass or a Mongo Shell:
```js
db.sales.aggregate([...])
```

### Output Format
```json
[
  {
    "store": "Store A",
    "month": "2024-06",
    "totalRevenue": 230.0,
    "averagePrice": 15.0
  }
]
```
