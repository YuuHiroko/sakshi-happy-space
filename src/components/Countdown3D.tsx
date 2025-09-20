import { useState, useEffect } from "react";
import { Text } from "@react-three/drei";

const birthdayDate = new Date("2025-09-23T00:00:00").getTime();

function getCountdown() {
  const now = Date.now();
  const diff = Math.max(birthdayDate - now, 0);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs };
}

export default function Countdown3D() {
  const [countdown, setCountdown] = useState(getCountdown());

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getCountdown()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <group position={[0, -0.7, 0]}>
      <Text
        fontSize={0.18}
        color="#ff8da7"
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.008}
        outlineColor="#fff"
      >
        {countdown.days > 0
          ? `Birthday in ${countdown.days}d ${countdown.hours}h ${countdown.mins}m ${countdown.secs}s`
          : "🎉 Happy Birthday Sakshi! 🎉"}
      </Text>
    </group>
  );
}