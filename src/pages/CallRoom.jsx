import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import AgoraVideoCall from "../Components/AgoraVideoCall";

export default function CallRoom() {
  const { room } = useParams();
  const navigate = useNavigate();

  if (!room) return <div className="text-white p-6">Missing room.</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0a14]">
      <div className="w-full max-w-5xl p-4">
        <AgoraVideoCall
          appId="905d963343c742b2969cf8b2ab2a94ad"
          channel={room}         // 👈 join by URL
          token={null}           // ok for Unsecure project (dev)
          onEnd={() => navigate("/")}
        />
      </div>
    </div>
  );
}
