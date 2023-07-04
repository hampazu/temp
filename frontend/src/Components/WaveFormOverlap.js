import React from "react";
import { useSelector } from "react-redux";
import WaveForm from "./WaveForm";

function WaveFormOverlap({ url }) {
  const { waveform } = useSelector((state) => state.waveform);

  return (
    <div>
      <div>
        <WaveForm
          url={"data:audio/ogg;base64," + waveform.file}
          color={"red"}
          color1={"black"}
        />
      </div>
      <div style={{ position: "relative", left: 0, top:-128, marginBottom: -128 }}>
        <WaveForm url={url} color={"green"} color1={"blue"} />
      </div>
    </div>
  );
}

export default WaveFormOverlap;
