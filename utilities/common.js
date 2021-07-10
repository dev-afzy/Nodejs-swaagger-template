const common = {
  filterResponse: (queryData) => {
    let obj = {};
    let sort = true;
    if (
      queryData.sortvalue === undefined ||
      queryData.sortColumn === undefined
    ) {
      sort = false;
      obj.sortvalue = '-1';
      obj.sortColumn = 'createdDate';
    }
    obj = {
      pageSize: queryData.pageSize,
      pageNo: queryData.pageNo,
      sortvalue: sort ? queryData.sortvalue : obj.sortvalue,
      sortColumn: sort ? queryData.sortColumn : obj.sortColumn,
    };
    if (queryData.filterColumn && queryData.filterValue) {
      obj.query = { [queryData.filterColumn]: queryData.filterValue };
    }
    return obj;
  },
};
module.exports = common;
