import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { SCENES } from "@/lib/brand";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

const API = process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

export default function CommercialPlayer() {
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [duration, setDuration] = useState(110);
  const [currentTime, setCurrentTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const currentScene = useMemo(
    () => SCENES.find((s) => currentTime >= s.start && currentTime < s.end) || SCENES[SCENES.length - 1],
    [currentTime]
  );

  useEffect(() => {
    axios.get(`${API}/api/commercial/audio`, { responseType: "blob" }).then((res) => {
      setAudioUrl(URL.createObjectURL(res.data));
    });
  }, []);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onTime = () => setCurrentTime(a.currentTime);
    const onMeta = () => setDuration(a.duration || 110);
    const onEnd = () => setPlaying(false);
    a.addEventListener("timeupdate", onTime);
    a.addEventListener("loadedmetadata", onMeta);
    a.addEventListener("ended", onEnd);
    return () => {
      a.removeEventListener("timeupdate", onTime);
      a.removeEventListener("loadedmetadata", onMeta);
      a.removeEventListener("ended", onEnd);
    };
  }, [audioUrl]);

  const togglePlay = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      await a.play();
      setPlaying(true);
    }
  };

  return (
    <section id="commercial" className="mx-auto max-w-6xl px-4 py-20">
      <div className="df-glass df-scanline rounded-2xl p-6">
        <div className="relative mb-6 h-72 overflow-hidden rounded-xl">
          <img src={currentScene.bg} alt={currentScene.label} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/45 p-6">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{currentScene.label}</p>
            <h2 className="mt-2 text-3xl font-bold">{currentScene.headline}</h2>
            <p className="mt-2 text-white/80">{currentScene.caption}</p>
          </div>
        </div>
        <audio ref={audioRef} src={audioUrl} muted={muted} />
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Button onClick={togglePlay}>{playing ? <Pause size={16} /> : <Play size={16} />}</Button>
          <Button variant="outline" onClick={() => setMuted((m) => !m)}>{muted ? <VolumeX size={16} /> : <Volume2 size={16} />}</Button>
          <div className="ml-auto flex h-7 items-end gap-1">
            {Array.from({ length: 14 }).map((_, i) => <span key={i} className="df-bar" style={{ height: `${8 + ((i * 7) % 20)}px` }} />)}
          </div>
        </div>
        <Slider
          min={0}
          max={duration}
          value={[currentTime]}
          onValueChange={([value]) => {
            setCurrentTime(value);
            if (audioRef.current) audioRef.current.currentTime = value;
          }}
        />
        <div className="mt-4 flex flex-wrap gap-2">
          {SCENES.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setCurrentTime(s.start);
                if (audioRef.current) audioRef.current.currentTime = s.start;
              }}
              className={`rounded-full px-3 py-1 text-xs ${currentScene.id === s.id ? "bg-primary text-black" : "bg-white/10 text-white/85"}`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
