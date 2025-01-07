import React, { useState, useEffect } from 'react';
// import ReactPaginate from 'react-paginate';
// import { CSVLink } from 'react-csv';
import '../styles/ContextPage.css';

function ContextPage() {
    const [transactions, setTransactions] = useState([]);
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        if (!authToken) {
          window.location.href = '/login';
        } else {
          const listContext = async () => {
            try {
              const response = await fetch('https://canary-be.onrender.com/api/context', {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${authToken}`,
                },
              });
    
              if (response.ok) {
                const body = await response.json();
                setTransactions(body.data);
              } else {
                setTransactions([]);
              }
            } catch (error) {
              console.error('Error fetching data:', error);
            }
          };
    
          listContext();
        }
      }, [authToken]);

   

    const handleCreateContextClick = () => {
        window.location.href = `/create-context`;
    };


    return (
        <div>
            <div id="context-container">
                <button id="create-context-btn" onClick={handleCreateContextClick}>Create Context</button>
                <h2 id="header">Context List</h2>

                {/* Table to display transactions */}
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Query</th>
                            <th>Schema</th>
                            <th>Mock Response</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction._id}>
                                <td>{transaction.name}</td>
                                <td>{transaction.query}</td>
                                <td>{transaction.schema}</td>
                                <td>{transaction.mockApis}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ContextPage;
