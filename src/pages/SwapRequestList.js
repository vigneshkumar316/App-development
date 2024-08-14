import React, { useState } from 'react';
import SwapRequestForm from './SwapRequestForm';
import './SwapRequestList.css';

const initialSwapRequests = [];

function SwapRequestList() {
  const [swapRequests, setSwapRequests] = useState(initialSwapRequests);

  const addSwapRequest = (newRequest) => {
    setSwapRequests([...swapRequests, { ...newRequest, id: swapRequests.length + 1 }]);
  };

  const deleteSwapRequest = (id) => {
    setSwapRequests(swapRequests.filter(request => request.id !== id));
  };

  return (
    <div className="swap-request-list">
      <h2>Swap Requests</h2>
      <ul>
        {swapRequests.map(request => (
          <li key={request.id} className="swap-request-item">
            <div>
              <strong>From:</strong> {request.fromUsername} <br />
              <strong>To:</strong> {request.toUsername} <br />
              <strong>Check-In:</strong> {request.checkIn} <br />
              <strong>Check-Out:</strong> {request.checkOut} <br />
              <strong>Reason:</strong> {request.reason}
            </div>
            <button onClick={() => deleteSwapRequest(request.id)} className="delete-btn">Delete</button>
          </li>
        ))}
      </ul>
      <SwapRequestForm addSwapRequest={addSwapRequest} />
    </div>
  );
}

export default SwapRequestList;
