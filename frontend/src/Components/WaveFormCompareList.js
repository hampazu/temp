import React, { useEffect, useState } from "react";
import WaveFormCompare from "./WaveFormCompare";
import { Plus } from "react-bootstrap-icons";
import { useSelector } from "react-redux";

function WaveFormCompareList() {
  const [iterator, setIterator] = useState([1]);

  const { waveform } = useSelector((state) => state.waveform);

  useEffect(() => {
    setIterator([1]);
  }, [waveform]);

  return (
    <div>
      <h2>Iterations:</h2>
      {iterator.map((value) => (
        <div key={value}>
          <WaveFormCompare />
        </div>
      ))}
      <button
        className="btn"
        style={{
          marginLeft: 550,
          backgroundColor: "#189AB4",
          color: "white"
        }}
        onClick={() => {
          setIterator([...iterator, iterator.length + 1]);
        }}
      >
        <Plus size={30} />
      </button>
    </div>
  );
}

export default WaveFormCompareList;
