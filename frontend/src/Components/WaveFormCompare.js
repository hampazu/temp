import React, { useEffect, useState } from "react";
import WaveFormPrompt from "./WaveFromPrompt";
import { useDispatch, useSelector } from "react-redux";
import WaveFormOverlap from "./WaveFormOverlap";
import {
  createActivity,
  updateActivity,
} from "../features/library/librarySlice";

function WaveFormCompare() {
  const [wave2, setWave2] = useState([]);
  const [url, setURL] = useState("");
  const [overlap, setOverlap] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const { waveform, waveformPeak } = useSelector((state) => state.waveform);
  const { activity } = useSelector((state) => state.library);

  const dispatch = useDispatch();

  useEffect(() => {
    setURL("");
    setWave2([]);
  }, [waveform, setURL, setWave2]);

  const percentage = (function getPercentage() {
    const percentage = [];
    let sum = 0;
    let calc = null;
    waveformPeak.forEach((x, i) => {
      calc = (wave2[i] / x) * 100;
      if (!isNaN(calc)) percentage.push(calc);
    });
    percentage.forEach((x) => {
      sum = sum + x;
    });
    let average = sum / percentage.length;

    return isNaN(average) ? null : average.toFixed(2).toString() + "%";
  })();

  const length = (function getLength() {
    const length = (wave2.length / waveformPeak.length) * 100;

    return length.toFixed(2).toString() + "%";
  })();

  useEffect(() => {
    if (user !== null && url !== "" && percentage !== null)
      if (activity.length === 0) {
        dispatch(
          createActivity({
            user: user._id,
            record: waveform._id,
            percentage: [{ peaks: percentage, length: length }],
          })
        );
      } else {
        dispatch(
          updateActivity({
            user: user._id,
            record: waveform._id,
            percentage: [...activity, { peaks: percentage, length: length }],
          })
        );
      }
  }, [url, dispatch, length, percentage, user]);

  return (
    <>
      {overlap === false && (
        <WaveFormPrompt
          color="green"
          color1={"blue"}
          setWave={setWave2}
          setURL={setURL}
          url={url}
        />
      )}
      {percentage !== null && (
        <>
          {overlap === true && url !== "" && <WaveFormOverlap url={url} />}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              position: "relative",
            }}
          >
            <h4 style={{ margin: 10 }}>Phonetics: {percentage}</h4>
            <h4 style={{ margin: 10 }}> Completeness: {length}</h4>
            <button
              className="btn btn-sm"
              onClick={() => setOverlap(!overlap)}
              style={{backgroundColor: "#189AB4", color: "white"}}
            >
              Overlap
            </button>
          </div>
        </>
      )}
    </>
  );
}

export default WaveFormCompare;
