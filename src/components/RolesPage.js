import React, { useState, useEffect } from 'react';
// import ReactPaginate from 'react-paginate';
// import { CSVLink } from 'react-csv';
import '../styles/UserPage.css';

function RolesPage() {
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
            const response = await fetch('http://localhost:3000/api/roles', {
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

    return (
        <div>
            <div id="context-container">
                <h2 id="header">Roles List</h2>

                {/* Table to display transactions */}
                <table>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Name</th>
                            <th>Permissions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map(transaction => (
                            <tr key={transaction.id}>
                                <td>{transaction.id}</td>
                                <td>{transaction.name}</td>
                                <td>{transaction.permissions}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default RolesPage;
