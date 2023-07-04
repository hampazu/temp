import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../features/category/categorySlice";

function Adminpanel() {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [blob, setBlob] = useState(null);
  const [recordingName, setRecordingName] = useState("");
  const [category, setCategory] = useState("");
  const { categories } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    // Lazily obtain recorder first time we're recording.
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = async (e) => {
      const chunk = [];
      chunk.push(e.data);
      const blob = new Blob(chunk, { type: "audio/ogg; codecs=opus" });
      const url = URL.createObjectURL(blob);
      setAudioURL(url);
      setBlob(blob);
    };

    recorder.addEventListener("dataavailable", handleData);

    return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  async function requestRecorder() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return new MediaRecorder(stream);
  }

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const uploadRecording = async () => {
    const formData = new FormData();
    formData.append("recording", blob);
    formData.append("recordingName", recordingName);
    formData.append("category",category._id);
    await axios.post("http://localhost:5000/api/library/", formData);
    setBlob(null);
    setRecordingName("");
    setCategory("")

  };

  return (
    <div style={{ position: "relative", left: "20vw" }}>
      <audio src={audioURL} controls />
      <button
        className="btn btn-primary"
        onClick={startRecording}
        disabled={isRecording}
      >
        start recording
      </button>
      <button
        className="btn btn-primary"
        onClick={stopRecording}
        disabled={!isRecording}
      >
        stop recording
      </button>
      <input
        id="recordingName"
        name="recordingName"
        type="text"
        value={recordingName}
        className="form-control "
        placeholder="Enter Recording Name"
        onChange={(e) => setRecordingName(e.target.value)}
      />
      {categories.map((c) => (
        <button key={c._id} className="btn btn-success" onClick={() => setCategory(c)}>
          {c.name}
        </button>
      ))}
      <h6> selected: {category.name}</h6>
      <button
        className="btn btn-primary"
        disabled={!blob || !recordingName || !category}
        onClick={uploadRecording}
      >
        upload recording
      </button>
    </div>
  );
}

export default Adminpanel;
