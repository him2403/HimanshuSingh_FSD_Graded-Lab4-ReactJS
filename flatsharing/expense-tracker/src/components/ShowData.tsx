// ShowData.tsx

import React, { useEffect, useState } from 'react';
import IDataList from '../model/IDataList';
import ExpenseTracker from './ExpenseTracker';
import { getDataFromServer } from '../service/menu';
import './ShowData.css';

function ShowData() {
  const [items, setItems] = useState<IDataList[]>([]);
  const [sum, setSum] = useState<number | null>();
  const [rahulSpent, setRahulSpent] = useState<number>(0);
  const [rameshSpent, setRameshSpent] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDataFromServer();
        setItems(data);
        const total = data.reduce((res, each) => (res + each.price), 0);
        setSum(total);
        shares(data);
      } catch (error: any) {
        setError(error);
      }
    };
    fetchData();
  }, [showForm]);

  const shares = (data: IDataList[]) => {
    let rahulSpentTotal = 0;
    let rameshSpentTotal = 0;

    data.forEach((each) => {
      each.payeeName === 'Rahul' ? (rahulSpentTotal += each.price) : (rameshSpentTotal += each.price);
    });

    setRahulSpent(rahulSpentTotal);
    setRameshSpent(rameshSpentTotal);
  };

  const success = () => {
    setShowForm(false);
  };

  const cancel = () => {
    setShowForm(false);
  };

  return (
    <div className="show-data-container">
      <header className="page-header">
        Expense Tracker
      </header>



      {showForm && (
        <div className="form-popup">
          <ExpenseTracker onTrue={success} onClose={cancel} />
        </div>
      )}


      <table>

        <thead>
          <tr>
            <th>Date</th>
            <th>Product Purchased</th>
            <th>Price</th>
            <th>Payee</th>
            <div><button className="add-button" onClick={() => setShowForm(true)}>Add</button></div>
          </tr>
        </thead>

        {/* Table body */}
        <tbody>
          {items.map((user, ind) => (
            <tr key={ind}>
              <td className="date-column">{user.setDate}</td>
              <td className="product-column">{user.product}</td>
              <td className="price-column">{user.price}</td>
              <td className={`payee-column ${user.payeeName}`}>{user.payeeName}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display totals and payable */}
      <hr />
      <table className="totals-table">
        <tbody>
          <tr className="total-row">
            <td>Total:</td>
            <td>{sum}</td>
          </tr>
          <tr className="rahul-row">
            <td>Rahul Spent:</td>
            <td>{rahulSpent}</td>
          </tr>
          <tr className="ramesh-row">
            <td>Ramesh Spent:</td>
            <td>{rameshSpent}</td>
          </tr>
          <tr className="payable-row">
            
            <td>{rahulSpent > rameshSpent ? "Pay to Rahul" : "Pay to Ramesh"}</td>
            <td><span className="use-inline payable price">{" "}{Math.abs((rahulSpent-rameshSpent)/2)}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ShowData;
