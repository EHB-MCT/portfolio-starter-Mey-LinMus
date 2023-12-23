import React, { useEffect } from "react";

const DataFetching = () => {
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
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
      });
  }, []);

  return <div></div>;
};

export default DataFetching;
