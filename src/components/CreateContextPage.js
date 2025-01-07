import React, { useState } from 'react';
import '../styles/CreateContextPage.css';

function CreateContextPage() {
    const [contextData, setContextData] = useState({
        name: '',
        type: 'GraphQL',
        role: 'Your customer is',
        context: 'You are a knowledge assistant with access to the following GraphQL schema and data. Always try to answer based on this context',
        query: '',
        mockApis: '',
        schema: '',
    });

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const baseUrl = "https://canary-be.onrender.com"; // Replace "{{url}}" with your actual base URL

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setContextData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        console.log('contextData', contextData);
        try {
            const response = await fetch(`${baseUrl}/api/context`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contextData),
            });

            if (!response.ok) {
                throw new Error('Failed to create context');
            }

            setMessage('Context created successfully!');
            // setTimeout(() => {
            //     window.location.href = '/context';
            // }, 2000); // Redirect after 2 seconds
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div id="create-context-container">
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
                            placeholder={`Enter your GraphQL query here...\nEx:\nquery GetCarDetails($id: ID!) {\n car(id: $id) {\n     id\n     name\n     model\n     manufacturer\n     year\n   }\n}`}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mock-response">Mock Response (JSON)</label>
                        <textarea
                            id="mock-response"
                            name="mockApis"
                            value={contextData.mockResponse}
                            onChange={handleInputChange}
                            placeholder={`Enter the mock response in JSON format...\nEx:\n{\n  "data": {\n    "cars": [\n      {\n        "id": "1",\n        "name": "Tesla Model S",\n        "model": "2021",\n        "manufacturer": "Tesla",\n        "year": 2021\n      }\n    ]\n  }\n}`}
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
                            placeholder={`Enter the schema in JSON format...\nEx:\n{\n  "schema": {\n    "types": [\n      {\n        "kind": "OBJECT",\n        "name": "Car",\n        "fields": [\n          {\n            "name": "id",\n            "type": "Int",\n            "description": "Unique identifier for the car",\n            "dependency": "AuthenticationService, ValidationService",\n            "apiUsed": "mock API: /api/id",\n            "mockData": [1,2,3,4,5],\n            "mockApiEndpoint": "/api/id"\n          },\n          {\n            "name": "name",\n            "type": "String",\n            "description": "Car name",\n            "dependency": "MashingService, ValidationService",\n            "apiUsed": "mock API: /api/name",\n            "mockData": ["Model S","Civic","Corolla","Mustang","Wrangler"],\n            "mockApiEndpoint": "/api/name"\n          },\n          {\n            "name": "model",\n            "type": "String",\n            "description": "Car model",\n            "dependency": "MashingService, OrderService",\n            "apiUsed": "mock API: /api/model",\n            "mockData": ["Electric Sedan","Sedan","Sedan","Sports Car","SUV"],\n            "mockApiEndpoint": "/api/model"\n          },\n          {\n            "name": "manufacturer",\n            "type": "String",\n            "description": "Car manufacturer",\n            "dependency": "OrderService, PaymentService",\n            "apiUsed": "mock API: /api/manufacturer",\n            "mockData": ["Tesla","Honda","Toyota","Ford","Jeep"],\n            "mockApiEndpoint": "/api/manufacturer"\n          },\n          {\n            "name": "year",\n            "type": "Int",\n            "description": "Year of manufacturing",\n            "dependency": "AuthenticationService, PaymentService",\n            "apiUsed": "mock API: /api/year",\n            "mockData": [2022,2020,2021,2023,2022],\n            "mockApiEndpoint": "/api/year"\n          }\n        ]\n      }\n    ]\n  }\n}`}
                            required
                        />
                    </div>
                    <button type="submit" id="submit-btn" disabled={isLoading}>
                        {isLoading ? 'Submitting...' : 'Submit'}
                    </button>
                </form>

                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
}

export default CreateContextPage;
