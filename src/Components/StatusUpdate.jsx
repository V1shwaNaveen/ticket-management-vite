import React, { useState, useEffect } from "react";
import axios from "axios";

export default function StatusUpdate() {
  const [userValues, setUserValues] = useState(null); // To hold user data
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    const fetchUserValues = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/user-values");
        setUserValues(response.data);
        setError(null); // Clear any previous errors
      } catch (error) {
        setError("Failed to fetch user values.");
        console.error("Error fetching user values:", error);
      }
    };

    fetchUserValues();
  }, []); // Dependency array ensures fetch is called on component load

  return (
    <div>
      <h1>Status Update</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userValues ? (
        <div>
          <h3>Vendors</h3>
          {userValues.vendors.length > 0 ? (
            <pre>{JSON.stringify(userValues.vendors, null, 2)}</pre>
          ) : (
            <p>No vendors found.</p>
          )}

          <h3>Customers</h3>
          {userValues.customers.length > 0 ? (
            <pre>{JSON.stringify(userValues.customers, null, 2)}</pre>
          ) : (
            <p>No customers found.</p>
          )}
        </div>
      ) : (
        <p>Loading user values...</p>
      )}
    </div>
  );
}
