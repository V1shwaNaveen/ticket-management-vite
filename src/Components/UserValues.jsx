import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserValues() {
  const [vendors, setVendors] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [maxTicketCapacity, setMaxTicketCapacity] = useState(""); // State for max ticket capacity
  const navigate = useNavigate();

  // Handle vendor input changes
  const handleVendorChange = (e, index) => {
    const updatedVendors = [...vendors];
    updatedVendors[index][e.target.name] = e.target.value;
    setVendors(updatedVendors);
  };

  // Handle customer input changes
  const handleCustomerChange = (e, index) => {
    const updatedCustomers = [...customers];
    updatedCustomers[index][e.target.name] = e.target.value;
    setCustomers(updatedCustomers);
  };

  // Add a new vendor
  const addVendor = () => {
    setVendors([
      ...vendors,
      { vendorId: `Vendor${vendors.length + 1}`, totalTickets: "", ticketReleaseRate: "" },
    ]);
  };

  // Add a new customer
  const addCustomer = () => {
    setCustomers([...customers, { customerId: `Customer${customers.length + 1}`, retrievalRate: "" }]);
  };

  // Save data and continue to next page
  const handleContinue = async () => {
    try {
      const data = { vendors, customers, maxTicketCapacity };
      const response = await axios.post("http://localhost:8080/api/user-values", data);

      // Navigate to the next page after saving data
      navigate("/StatusUpdate"); // Replace with the actual path you want to navigate to

      alert("User values saved successfully and continuing to next page!");
    } catch (error) {
      console.error("Error saving user values:", error);
      alert("Error saving user values!");
    }
  };

  return (
    <div>
      <h1>User Values</h1>
      <form>
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
              <input
                type="text"
                name="vendorId"
                value={vendor.vendorId}
                onChange={(e) => handleVendorChange(e, index)}
                placeholder={`Vendor${index + 1}`}
                disabled
              />
              <label>Total Tickets: </label>
              <input
                type="number"
                name="totalTickets"
                value={vendor.totalTickets}
                onChange={(e) => handleVendorChange(e, index)}
                placeholder="Enter total tickets"
              />
              <label>Ticket Release Rate: </label>
              <input
                type="number"
                name="ticketReleaseRate"
                value={vendor.ticketReleaseRate}
                onChange={(e) => handleVendorChange(e, index)}
                placeholder="Enter ticket release rate"
              />
            </div>
          ))}
          <button type="button" onClick={addVendor}>Add Vendor</button>
        </div>

        <div>
          <h3>Customers</h3>
          {customers.map((customer, index) => (
            <div key={index}>
              <label>Customer ID: </label>
              <input
                type="text"
                name="customerId"
                value={customer.customerId}
                onChange={(e) => handleCustomerChange(e, index)}
                placeholder={`Customer${index + 1}`}
                disabled
              />
              <label>Retrieval Rate: </label>
              <input
                type="number"
                name="retrievalRate"
                value={customer.retrievalRate}
                onChange={(e) => handleCustomerChange(e, index)}
                placeholder="Enter retrieval rate"
              />
            </div>
          ))}
          <button type="button" onClick={addCustomer}>Add Customer</button>
        </div>

        <button type="button" onClick={handleContinue}>Continue</button>
      </form>
    </div>
  );
}

export default UserValues;
