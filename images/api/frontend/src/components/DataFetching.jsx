import React, { useState, useEffect } from "react";

const DataFetching = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "http://localhost:3000/users";

    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {userData && (
        <div>
          {userData.map((user) => (
            <div key={user.id}>
              <h2>{user.name}</h2>
              <p>{user.birthday}</p>
              <p> {user.age}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DataFetching;
