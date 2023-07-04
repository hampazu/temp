import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard";
import { useSelector, useDispatch } from "react-redux";
import WaveForm from "../Components/WaveForm";
// import WaveFormPrompt from "../Components/WaveFromPrompt";
import {
  resetWaveform,
  setWaveform,
  setWaveformPeak,
} from "../features/waveform/waveformSlice";
import WaveFormCompareList from "../Components/WaveFormCompareList";

export default function ViewRecordings() {
  const { user } = useSelector((state) => state.auth);
  // const [audioURL, setAudioURL] = useState("");
  const { waveform } = useSelector((state) => state.waveform);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetWaveform());
  }, [dispatch]);

  const onClick = (recording) => {
    // setAudioURL("data:audio/ogg;base64," + url);
    dispatch(setWaveform(recording));
  };

  const setWave1Peak = (peak) => {
    dispatch(setWaveformPeak([...peak]));
  };

  return (
    <Dashboard>
      <div style={{ position: "relative", left: 20 }}>
        <div className="recording-list-box">
          {user.recordings.map((recording) => (
            <div
              key={recording._id}
              className="recording-list-element"
              onClick={() => onClick(recording)}
            >
              <span className="recording-list-icon"></span>
              <span className="recording-list-text">{recording.display}</span>
            </div>
          ))}
        </div>
      </div>
        
      {Object.keys(waveform).length !== 0 && (
        <div style={{ position: "relative", left: "30vw" }}>
          <WaveForm
            url={"data:audio/ogg;base64," + waveform.file}
            color={"red"}
            color1={"black"}
            setWave={setWave1Peak}
          />
          <WaveFormCompareList />
        </div>
      )}
    </Dashboard>
  );
}
