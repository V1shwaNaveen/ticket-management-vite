import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserValues() {
  const [vendors, setVendors] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [maxTicketCapacity, setMaxTicketCapacity] = useState("");
  const navigate = useNavigate();

  // Add a new vendor
  const addVendor = () => {
    setVendors([
      ...vendors,
      { vendorId: `Vendor${vendors.length + 1}`, totalTickets: "", ticketReleaseRate: "" },
    ]);
  };

  // Add a new customer
  const addCustomer = () => {
    setCustomers([
      ...customers,
      { customerId: `Customer${customers.length + 1}`, retrievalRate: "" },
    ]);
  };

  // Save data and navigate to StatusUpdate
  const handleContinue = async () => {
    try {
      const data = { vendors, customers, maxTicketCapacity };
      await axios.post("http://localhost:8080/api/user-values", data);
      navigate("/StatusUpdate"); // Go to the StatusUpdate page
    } catch (error) {
      console.error("Error saving user values:", error);
      alert("Error saving user values!");
    }
  };

  return (
    <div>
      <h1>User Values</h1>

      <div>
        <label>Max Ticket Capacity: </label>
        <input
          type="number"
          value={maxTicketCapacity}
          onChange={(e) => setMaxTicketCapacity(e.target.value)}
          placeholder="Enter max ticket capacity"
        />
      </div>

      <div>
        <h3>Vendors</h3>
        {vendors.map((vendor, index) => (
          <div key={index}>
            <label>Vendor ID: </label>
            <input type="text" value={vendor.vendorId} disabled />
            <label>Total Tickets: </label>
            <input
              type="number"
              name="totalTickets"
              value={vendor.totalTickets}
              onChange={(e) => {
                const updatedVendors = [...vendors];
                updatedVendors[index].totalTickets = e.target.value;
                setVendors(updatedVendors);
              }}
              placeholder="Enter total tickets"
            />
            <label>Ticket Release Rate: </label>
            <input
              type="number"
              name="ticketReleaseRate"
              value={vendor.ticketReleaseRate}
              onChange={(e) => {
                const updatedVendors = [...vendors];
                updatedVendors[index].ticketReleaseRate = e.target.value;
                setVendors(updatedVendors);
              }}
              placeholder="Enter ticket release rate"
            />
          </div>
        ))}
        <button type="button" onClick={addVendor}>
          Add Vendor
        </button>
      </div>

      <div>
        <h3>Customers</h3>
        {customers.map((customer, index) => (
          <div key={index}>
            <label>Customer ID: </label>
            <input type="text" value={customer.customerId} disabled />
            <label>Retrieval Rate: </label>
            <input
              type="number"
              name="retrievalRate"
              value={customer.retrievalRate}
              onChange={(e) => {
                const updatedCustomers = [...customers];
                updatedCustomers[index].retrievalRate = e.target.value;
                setCustomers(updatedCustomers);
              }}
              placeholder="Enter retrieval rate"
            />
          </div>
        ))}
        <button type="button" onClick={addCustomer}>
          Add Customer
        </button>
      </div>

      <button type="button" onClick={handleContinue}>
        Continue
      </button>
    </div>
  );
}

export default UserValues;
