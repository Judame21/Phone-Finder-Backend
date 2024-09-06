exports.getProducts = (req, res) => {
    const products = [
      { id: 1, name: 'Phone A', price: 299 },
      { id: 2, name: 'Phone B', price: 399 },
    ];
    res.json(products);
  };
  