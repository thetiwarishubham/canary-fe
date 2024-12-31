import React, { useState, useEffect } from 'react';
import '../styles/ChatbotPage.css';

const Chatbot = () => {
    const [authToken] = useState(localStorage.getItem('authToken'));
    const [roles] = useState([
        { value: "devops", label: "🔧 DevOps" },
        { value: "manager", label: "👔 Manager" },
        { value: "dev", label: "💻 Developer" },
        { value: "technical_operations", label: "⚙️ Tech Ops" }
    ]);
    const [languages] = useState([
        { value: "english", label: "English" },
        { value: "french", label: "French" },
        { value: "german", label: "German" },
        { value: "hindi", label: "Hindi" },
        { value: "spanish", label: "Spanish" }
    ]);
    const [role, setRole] = useState("");
    const [language, setLanguage] = useState("");
    const [query, setQuery] = useState("");
    const [options, setOptions] = useState([]);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    useEffect(() => {
        if (!authToken) {
            window.location.href = '/login';
        }
    }, [authToken]);
    
    const fetchOptions = async (searchQuery) => {
        try {
            const response = await fetch(`https://canary-be.onrender.com/api/context/search?name=${searchQuery}`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            });
            const body = await response.json();
            setOptions(body.data || []);
            setDropdownVisible(true);
        } catch (error) {
            console.error("Error fetching options:", error);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        if (value.length >= 2) {
            fetchOptions(value);
        } else {
            setDropdownVisible(false);
        }
    };

    const handleOptionClick = (option) => {
        setQuery(option.name);
        setDropdownVisible(false);
    };

    const submitData = () => {
        const selectedContext = options.find(option => option.name === query);
        const name = 'Shubham';
        if (!role) {
            alert("Please select a role!");
            return;
        }

        if (selectedContext) {
            console.log("Selected Context:", selectedContext);
            console.log("Selected Role:", role);
            console.log("Selected Language:", language);
            window.location.href = `/chat?context=${selectedContext.id}&role=${role}&lang=${language}&name=${name}`;
        } else {
            alert("Please type or select a valid option!");
        }
    };

    return (
        <div id="chat-container">
            <div id="header">
                {/* <img src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.facebook.com%2Fcanarylabs%2F%3Flocale%3Dzh_CN&psig=AOvVaw12Vki5wc0ZAYenAOh0usyr&ust=1735462553911000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwj7wdL5i8qKAxU6bmwGHbIGIA8QjRx6BAgAEBk" alt="Chatbot Icon" /> */}
                Canary Chatbot
            </div>
            <div id="role-container">
                <label htmlFor="role-select">Select Role:</label>
                <select
                    id="role-select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="">-- Select a Role --</option>
                    {roles.map((role) => (
                        <option key={role.value} value={role.value}>{role.label}</option>
                    ))}
                </select>
            </div>
            <div id="language-container">
                <label htmlFor="language-select">Select Language:</label>
                <select
                    id="language-select"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="">-- Select a Language --</option>
                    {languages.map((lang) => (
                        <option key={lang.value} value={lang.value}>{lang.label}</option>
                    ))}
                </select>
            </div>
            <div id="input-container">
            <label htmlFor="role-select">Select Context:</label>
                <input
                    type="text"
                    id="input-box"
                    placeholder="Type or select an option..."
                    value={query}
                    onChange={handleInputChange}
                />
                {dropdownVisible && (
                    <div id="dropdown">
                        {options.map((option) => (
                            <div
                                key={option.id}
                                className="dropdown-item"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.name}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <button id="submit-btn" onClick={submitData}>Submit</button>
        </div>
    );
};

export default Chatbot;
