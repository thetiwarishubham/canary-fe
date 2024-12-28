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
            listContext();
        }
    }, [authToken]);

    const listContext = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/modelData', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${authToken}`,
                }
            });

            if (response.ok) {
                const data = await response.json();
                setTransactions(data.reply);
            } else {
                setTransactions([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

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
                            <th>Id</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Context</th>
                            <th>Query</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.name}</td>
                                <td>{transaction.role}</td>
                                <td>{transaction.context}</td>
                                <td>{transaction.query}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ContextPage;