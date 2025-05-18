db.sales.aggregate([
  { $unwind: "$items" },
  {
    $project: {
      store: 1,
      month: { $dateToString: { format: "%Y-%m", date: "$date" } },
      revenue: { $multiply: ["$items.quantity", "$items.price"] },
      price: "$items.price"
    }
  },
  {
    $group: {
      _id: { store: "$store", month: "$month" },
      totalRevenue: { $sum: "$revenue" },
      averagePrice: { $avg: "$price" }
    }
  },
  {
    $project: {
      _id: 0,
      store: "$_id.store",
      month: "$_id.month",
      totalRevenue: 1,
      averagePrice: 1
    }
  },
  { $sort: { store: 1, month: 1 } }
])
