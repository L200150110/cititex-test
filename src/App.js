import logo from "./logo.svg";
import "./App.css";
import data from "./data.json";
import React, { useState, useEffect } from "react";

const styles = {
  table: {
    width: "100%",
    border: "1px solid",
  },
  th: {
    backgroundColor: "grey",
    color: "white",
  },
  td: {
    backgroundColor: "white",
    color: "black",
  },
};

function App() {
  const [total, setTotal] = useState([]);
  const [qty, setQty] = useState([]);

  const penjumlahan = (data) => {
    var hasil = [];
    data.forEach((item) => {
      let dataStock = JSON.parse(item["product_stock"]);
      let hasilSementara = 0;
      dataStock.forEach((stock) => {
        hasilSementara += Object.values(stock)[0];
      });
      hasil.push(hasilSementara);
    });
    return hasil;
  };

  const persentase = (data) => {
    var hasil = [];
    data.forEach((item, i) => {
      let dataItem = JSON.parse(item["items"]);
      dataItem.forEach((qty, i) => {
        if ("qty" in qty) {
          hasil.push(qty["qty"]);
        }
      });
    });
    return hasil;
  };

  useEffect(() => {
    setTotal(penjumlahan(data["proformaItem"]));
    setQty(persentase(data["proformaItem"]));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test Cititex</h1>
        <table style={styles.table}>
          <tr style={styles.th}>
            <th>Jakarta-Kedoya</th>
            <th>Tangerang-Dadap</th>
            <th>Bekasi-Galaxy</th>
            <th>Category</th>
            <th>Product</th>
            <th>Total Stock</th>
            <th>Percent %</th>
            <th>Total Order</th>
          </tr>
          {data["proformaItem"].map((item, i) => {
            return (
              <tr style={styles.td}>
                <td>
                  {JSON.parse(item["product_stock"]).map((pro, i) => {
                    if ("1" in pro) {
                      return pro["1"].toLocaleString();
                    }
                  })}
                </td>
                <td>
                  {JSON.parse(item["product_stock"]).map((pro, i) => {
                    if ("3" in pro) {
                      return pro["3"].toLocaleString();
                    }
                  })}
                </td>
                <td>
                  {JSON.parse(item["product_stock"]).map((pro, i) => {
                    if ("5" in pro) {
                      return pro["5"].toLocaleString();
                    }
                  })}
                </td>
                <td>{item["categoryDescription"]}</td>
                <td>{item["productDescription"]}</td>
                <td>{total[i].toLocaleString()}</td>
                <td>{((qty[i] / total[i]) * 100).toFixed(2)} %</td>
                <td>{qty[i]}</td>
              </tr>
            );
          })}
        </table>
      </header>
    </div>
  );
}

export default App;
