import React, { useState, useEffect } from 'react';
// import ReactPaginate from 'react-paginate';
// import { CSVLink } from 'react-csv';
import '../styles/UserPage.css';

function UserPage() {
    const [transactions, setTransactions] = useState([]);
    const authToken = localStorage.getItem('authToken');

    useEffect(() => {
        const listContext = async () => {
            try {
                const response = await fetch('https://canary-be.onrender.com/api/user', {
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

        if (!authToken) {
            window.location.href = '/login';
        } else {
            listContext();
        }
    }, [authToken]);



    return (
        <div>
            <div id="context-container">
                <h2 id="header">User List</h2>

                {/* Table to display transactions */}
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Username</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.username}</td>
                                <td>{transaction.password}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UserPage;
