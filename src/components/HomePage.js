import React, { useState, useEffect } from 'react';
import '../styles/HomePage.css';

function HomePage() {
    const [userName, setUserName] = useState('');
    const [initialBalance, setInitialBalance] = useState('');
    const [loading, setLoading] = useState(false);
    const [walletData, setWalletData] = useState(null);
    const [walletId, setWalletId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const storedWalletId = localStorage.getItem('walletId');
        if (storedWalletId) {
            fetch(`https://highlevel-be-api.onrender.com/wallet/${storedWalletId}`)
                .then(response => response.json())
                .then(data => {
                    setWalletData(data);
                })
                .catch(error => {
                    console.error('Error fetching wallet data:', error);
                });
        }
    }, []);

    const handleSubmit = () => {
        const requestBody = {
            balance: parseFloat(initialBalance) || 0,
            name: userName,
        };
        setLoading(true);
        fetch('https://highlevel-be-api.onrender.com/setup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
        })
            .then(response => response.json())
            .then(data => {
                console.log('wallet setup:', data);
                if (data.error) {
                    setErrorMessage(data.error);
                } else {
                    setErrorMessage('');
                    // Save the wallet ID to local storage
                    localStorage.setItem('walletId', data.id);
                    setWalletData(data);
                    setWalletId(data.id);
                }

            })
            .catch(error => {
                console.error('API Error:', error);
            }).finally(() => {
                setLoading(false); // Set loading to false when the API response is received
            });
    };

    return (
        <div className="home-container">
            <h2>Home Page</h2>
            {errorMessage && (
                <p className="error-message">
                    Error: {errorMessage}
                </p>
            )}
            {!walletId ? (
                <div>
                    <label className="form-input">
                        Wallet Name:
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </label>
                    <br />
                    <br />
                    <label className="form-input">
                        Initial Balance:
                        <input
                            type="number"
                            value={initialBalance}
                            onChange={(e) => setInitialBalance(e.target.value)}
                        />
                    </label>
                    <br />
                    <br />
                    <button className="submit-button" onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Loading...' : 'Submit'}
                    </button>
                </div>
            ) : (
                <div>
                    <a href="/transact">Go to Transaction Page</a>
                    {<p>Wallet Balance: {walletData.balance}</p>}
                    {<p>Wallet Name: {walletData.name}</p>}
                </div>
            )}
        </div>
    );
}

export default HomePage;
