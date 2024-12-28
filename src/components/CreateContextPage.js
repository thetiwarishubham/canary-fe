import React, { useState } from 'react';
import '../styles/CreateContextPage.css';

function CreateContextPage() {
    const [contextData, setContextData] = useState({
        name: '',
        role: '',
        context: '',
        query: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContextData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logic to send the data to the server
        console.log('Context created:', contextData);
    };

    return (
        <div>
            <div id="context-container">
                <h2 id="header">Create New Context</h2>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={contextData.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="role">Type</label>
                        <select
                            id="role"
                            name="role"
                            value={contextData.role}
                            onChange={handleInputChange}
                            required
                        >
                            <option value="graphql">GraphQL</option>
                            <option value="document">Document</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="query">Query (GraphQL)</label>
                        <textarea
                            id="query"
                            name="query"
                            value={contextData.query}
                            onChange={handleInputChange}
                            placeholder="Enter your GraphQL query here..."
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mock-response">Mock Response (JSON)</label>
                        <textarea
                            id="mock-response"
                            name="mock-response"
                            value={contextData.mockResponse}
                            onChange={handleInputChange}
                            placeholder="Enter the mock response in JSON format..."
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="schema">Schema (JSON)</label>
                        <textarea
                            id="schema"
                            name="schema"
                            value={contextData.schema}
                            onChange={handleInputChange}
                            placeholder="Enter the schema in JSON format..."
                            required
                        />
                    </div>
                    <button type="submit" id="submit-btn">Submit</button>
                </form>

            </div>
        </div>
    );
}

export default CreateContextPage;
