import React, { useEffect, useState } from "react";
import Loader from "react-loader-spinner";

const Loading = () => {
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    }
  }, [loading]);

  return (
    <div>
      {loading ? (
        <Loader
          type="Oval"
          color="#f3cc62"
          height={100}
          width={100}
        />
      ) : (
        <h3 style={{ color: "#f37370" }}>Unknown Error in Loading data..</h3>
      )}
    </div>
  );
};

export default Loading;
