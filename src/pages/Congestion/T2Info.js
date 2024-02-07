import React, { useEffect, useState } from "react";
import axios from "axios";

const T2Info = () => {
  const [congestionData, setCongestionData] = useState([]);
  //시간대
  const [atime, setAtime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/congestionData", atime);

        // Boot에서 반환한 String 데이터를 state에 저장
        setCongestionData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleKeywordChange = (event) => {
    const memberId = event.target.value;
    setMember((prevMember) => ({ ...member, memberId }));
  };

  return (
    <div>
      <h1>Congestion Data</h1>

      <input
        margin="normal"
        required
        fullWidth
        label="타임데이터 예제"
        onChange={handleKeywordChange}
        value={data.t1dep3}
        autoComplete="memberId"
        autoFocus
      />

      {/* key-value 형식으로 데이터 출력 */}
      {Object.entries(congestionData).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {JSON.stringify(value)}
        </div>
      ))}
    </div>
  );
};

export default T2Info;
