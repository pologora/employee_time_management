class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    let queryObj = { ...this.queryString };
    const excludedFields = ['sort', 'fields'];
    excludedFields.forEach((item) => delete queryObj[item]);

    const queryStr = JSON.stringify(queryObj).replace(/\b(gte|gt|lt|lte)\b/g, (item) => `$${item}`);
    queryObj = JSON.parse(queryStr);
    this.query.find(queryObj);

    return this;
  }

  sort() {
    const { sort } = this.queryString;
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('pin');
    }

    return this;
  }

  limitFields() {
    const { fields } = this.queryString;
    if (fields) {
      const fieldsBy = fields.split(',').join(' ');
      this.query = this.query.select(fieldsBy);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }
}

module.exports = APIFeatures;
