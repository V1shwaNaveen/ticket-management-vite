import React, { useEffect, useState } from "react";
import axios from "axios";

function StatusUpdate() {
  const [userValues, setUserValues] = useState(null); // Store user-entered values

  useEffect(() => {
    // Fetch the user values from the backend when the component loads
    axios
      .get("http://localhost:8080/api/user-values")
      .then((response) => {
        console.log("User Values:", response.data);
        setUserValues(response.data); // Set the fetched data
      })
      .catch((error) => console.error("Error fetching user values:", error));
  }, []);

  const startTicketProcess = () => {
    // Inform the backend to start the process
    axios
      .post("http://localhost:8080/api/user-values/start-process", {})
      .then(() => {
        alert("Ticket distribution process started!");
      })
      .catch((error) => {
        console.error("Error starting the ticket process:", error);
        alert("Error starting the ticket process!");
      });
  };

  return (
    <div>
      <h1>Status Update</h1>

      {userValues ? (
        <>
          <h2>Max Ticket Capacity</h2>
          <p>{userValues.maxTicketCapacity}</p>

          <h2>Vendors</h2>
          {userValues.vendors.map((vendor, index) => (
            <div key={index}>
              <p>Vendor ID: {vendor.vendorId}</p>
              <p>Total Tickets: {vendor.totalTickets}</p>
              <p>Ticket Release Rate: {vendor.ticketReleaseRate}</p>
            </div>
          ))}

          <h2>Customers</h2>
          {userValues.customers.map((customer, index) => (
            <div key={index}>
              <p>Customer ID: {customer.customerId}</p>
              <p>Retrieval Rate: {customer.retrievalRate}</p>
            </div>
          ))}

          <button onClick={startTicketProcess}>Start Ticket Process</button>
        </>
      ) : (
        <p>Loading user values...</p>
      )}
    </div>
  );
}

export default StatusUpdate;
