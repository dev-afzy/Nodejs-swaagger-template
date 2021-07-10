const common = {
  filterResponse: (queryData) => {
    let obj = {};
    let sort = true;
    if (
      queryData?.sortvalue === undefined ||
      queryData?.sortColumn === undefined
    ) {
      sort = false;
      obj.sortvalue = '-1';
      obj.sortColumn = 'createdDate';
    }
    obj = {
      pageSize: queryData?.pageSize ?? 10,
      pageNo: queryData?.pageNo || 1,
      sortvalue: sort ? queryData?.sortvalue : obj.sortvalue,
      sortColumn: sort ? queryData?.sortColumn : obj?.sortColumn,
    };
    if (queryData.filterColumn && queryData.filterValue) {
      obj.query = { [queryData.filterColumn]: queryData.filterValue };
    }
    return obj;
  },
};
module.exports = common;
