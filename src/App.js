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

  const kuantitas = (data) => {
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
    setQty(kuantitas(data["proformaItem"]));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test Cititex</h1>
        {total.length === data["proformaItem"].length ? (
          <table style={styles.table}>
            <tr style={styles.th}>
              {data["location"].map((item, i) => {
                return <th>{item["name"]}</th>;
              })}
              <th>Category</th>
              <th>Product</th>
              <th>Total Stock</th>
              <th>Percent %</th>
              <th>Total Order</th>
            </tr>
            {data["proformaItem"].map((item, i) => {
              return (
                <tr style={styles.td}>
                  {data["location"].map((loc, j) => {
                    return (
                      <td>
                        {JSON.parse(item["product_stock"]).map((stock, k) => {
                          if (loc["id"] in stock) {
                            return stock[loc["id"]].toLocaleString();
                          }
                        })}
                      </td>
                    );
                  })}
                  <td>{item["categoryDescription"]}</td>
                  <td>{item["productDescription"]}</td>
                  <td>{total[i].toLocaleString()}</td>
                  <td>{((qty[i] / total[i]) * 100).toFixed(2)} %</td>
                  <td>{qty[i]}</td>
                </tr>
              );
            })}
          </table>
        ) : (
          <p>data loaded</p>
        )}
      </header>
    </div>
  );
}

export default App;
