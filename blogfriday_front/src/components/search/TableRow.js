import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TableRow = ({ product }) => {
  console.log(product);
  console.log(product.product_name);
  return (
    <tr>
      <td></td>
      <td>{product.product_name}</td>
      <td>{product.product_price}</td>
    </tr>
  );
};

export default TableRow;
