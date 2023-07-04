import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { uploadrecording } from "../features/auth/authSlice";
import Dashboard from "./Dashboard";

export default function CreateRecording() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [blob, setBlob] = useState(null);
  const [recordingName, setRecordingName] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

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
    formData.append("userid", user._id);
    formData.append("recordingName", recordingName);
    setBlob("");
    setRecordingName("");
    dispatch(uploadrecording(formData));
  };

  return (
    <Dashboard>
      <div className="dashboard-activity">
          <audio src={audioURL} controls />
          <button
            className="btn btn-success"
            onClick={startRecording}
            disabled={isRecording}
          >
            start recording
          </button>
          <button
            className="btn btn-success"
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
          <button
            className="btn btn-success"
            disabled={!blob || !recordingName}
            onClick={uploadRecording}
          >
            upload recording
          </button>
        </div>
    </Dashboard>
  );
}
