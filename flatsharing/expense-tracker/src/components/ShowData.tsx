import React, { useEffect, useState } from 'react';
import IDataList from '../model/IDataList';
import ExpenseTracker from './ExpenseTracker'; 
import { getDataFromServer } from '../service/menu';


function ShowData() {
  const [items, setItems] = useState<IDataList[]>([]);
  const [sum, setSum] = useState<number | null>();
  const [rahulSpent, setRahulSpent] = useState<number>(0);
  const [rameshSpent, setRameshSpent] = useState<number>(0);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetItems = async () => {
      try {
        const data = await getDataFromServer();
        setItems(data);
        setSum(data.reduce((res,  each) => (res = res + each.price), 0));
        shares(data);
      } catch (error: any) {
        setError(error);
      }
    };
    fetItems();
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
    <>
      <header id="page-header">Expense Tracker</header>
      <button id="Add-button" onClick={() => setShowForm(true)}>Add</button>
      {showForm && (
        <div className="form">
          <ExpenseTracker onTrue={success} onClose={cancel} />
        </div>
      )}
      <div className="use-inline date header color">Date</div>
      <div className="use-inline header color">Product Purchased</div>
      <div className="use-inline price header color">Price</div>
      <div className="use-inline header color" style={{ width: 100 }}>Payee</div>
      {items.map((user, ind) => (
        <div key={ind}>
          <div className="use-inline date">{user.setDate}</div>
          <div className="use-inline">{user.product}</div>
          <div className="use-inline price">{user.price}</div>
          <div className="use-inline" style={{ width: 100 }}>{user.payeeName}</div>
        </div>
      ))}
      <hr/>
      <div className="use-inline">Total:</div>
      <span className="use-inline total">{sum}</span> <br/>
      <div className="use-inline">Rahul Spent:</div>
      <span className="use-inline total Rahul">{rahulSpent}</span> <br/>
      <div className="use-inline">Ramesh Spent:</div>
      <span className="use-inline total Ramesh">{rameshSpent}</span> <br/>
      <span className="use-inline payable">
        {rahulSpent > rameshSpent ? "Pay to Rahul" : "Pay to Ramesh"}
      </span>
      <span className="use-inline payable price">{" "}{Math.abs((rahulSpent-rameshSpent)/2)}</span>
    </>
  );
}

export default ShowData;
