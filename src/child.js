import React, {useContext, useState} from 'react';
import './App.css';
import {TransactionContext} from './transContext';


function Child() {

    let {transactions, addTransaction} = useContext(TransactionContext); 
    
    let [newDesc, setDesc] = useState("");
    let [newAmount, setAmount] = useState();
    
    const handleAddition = (event) => {
        event.preventDefault();
        if (Number(newAmount) === 0) {
            alert("Please enter correct value");
            return false;
        }
        addTransaction({
            amount: Number(newAmount),
            desc: newDesc
        });

        setDesc('');
        setAmount(0)
    }

    const getIncome = () => {
        let income = 0;
        for(var i = 0;i < transactions.length; i++){
            if(transactions[i].amount> 0)
                income+=transactions[i].amount;
            
        }
        return income;
    }

    const getExpense = () => {
        let expense = 0;
        for(var i=0;i< transactions.length;i++){
            if(transactions[i].amount< 0)
                expense+=transactions[i].amount;
            
        }
        return expense;
    }

  return (
    <div className="container">
      <h1 className="text-center">
        Expense Tracker
      </h1>
      
    <h3>Your Balance<br/>${ getIncome() + getExpense()}</h3>
      
      <div className="expense-container">
        <h3>Income<br/>${getIncome()}</h3>
       <h3>Expense<br/>${getExpense()}</h3>
      </div>

      <h3>Transaction History</h3>
      <hr />

      <ul className="transaction-list">
        {transactions.map((transObj, ind)=>{return(
        
        <li key={ind}>
            <span>
                {transObj.desc} 
            </span>
            <span>
                ${transObj.amount}
            </span>
            <button className={"delete-button"} /*onClick={() => deleteTransaction(transObj.ind)}*/ >x
            </button>
        </li>)})}

      </ul>

      <h3>Add New Transactions 
      </h3>
      <hr />

      <form className="transaction-form" onSubmit={handleAddition}>
          <label>
              Enter Description<br />
              <input type="text"
              value={newDesc}
              placeholder="Description" 
              onChange={(ev)=>setDesc(ev.target.value)} required/>
          </label>

          <label>
              Enter Amount<br />
              <input type="number" 
              value={newAmount}
              placeholder="Amount"
              onChange={(ev)=>setAmount(ev.target.value)} required/>
          </label>
          <br/>

          <input type="submit" value="Add Transaction" className="button"/>
      </form>

    </div>
  );
}

export default Child;
