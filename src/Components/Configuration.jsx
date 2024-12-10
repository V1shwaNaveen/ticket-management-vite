import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

function Configuration() {
  const [config, setConfig] = useState({
    maxTicketCapacity: "",
    ticketReleaseRate: "",
    customerRetrievalRate: "",
    totalTickets: "",
  });

  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setConfig({ ...config, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/controller", config);
      alert("Configuration saved successfully!");
    } catch (error) {
      console.error("Error saving configuration:", error);
      alert("Error saving configuration!");
    }
  };

  const handleLoad = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/controller");
      setConfig(response.data);
    } catch (error) {
      console.error("Error loading configuration:", error);
      alert("Error loading configuration!");
    }
  };

  const handleNext = () => {
    // Here, use navigate and pass the state
    navigate("/StatusUpdate", {
      state: { useConfig: true }, 
      configValues : config,
        },
    );
  };

  return (
    <div>
      <h1>Configuration</h1>
      <form>
        <div>
          <label>Max Ticket Capacity: </label>
          <input
            type="number"
            name="maxTicketCapacity"
            value={config.maxTicketCapacity}
            onChange={handleChange}
            placeholder="Enter max ticket capacity"
          />
        </div>
        <div>
          <label>Ticket Release Rate: </label>
          <input
            type="number"
            name="ticketReleaseRate"
            value={config.ticketReleaseRate}
            onChange={handleChange}
            placeholder="Enter ticket release rate"
          />
        </div>
        <div>
          <label>Customer Retrieval Rate: </label>
          <input
            type="number"
            name="customerRetrievalRate"
            value={config.customerRetrievalRate}
            onChange={handleChange}
            placeholder="Enter customer retrieval rate"
          />
        </div>
        <div>
          <label>Total Tickets: </label>
          <input
            type="number"
            name="totalTickets"
            value={config.totalTickets}
            onChange={handleChange}
            placeholder="Enter total tickets"
          />
        </div>
        <button type="button" onClick={handleSave}>
          Save Configuration
        </button>
        <button type="button" onClick={handleLoad}>
          Load Configuration
        </button>
        <div>
          <Link to="/">
            <button>
              Back
            </button>
          </Link>
          <button type="button" onClick={handleNext}>
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default Configuration;
