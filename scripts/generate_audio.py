import wave
import struct
import math
import os
import shutil

os.makedirs("public/audio", exist_ok=True)
sample_rate = 22050
duration_sec = 60
num_samples = sample_rate * duration_sec

wav_path = "public/audio/sample-story-su.wav"
with wave.open(wav_path, "w") as wav_file:
    wav_file.setnchannels(1)
    wav_file.setsampwidth(2)
    wav_file.setframerate(sample_rate)

    frames = bytearray()
    for i in range(num_samples):
        t = float(i) / sample_rate
        env = min(1.0, t / 2.0) * min(1.0, (duration_sec - t) / 2.0)
        val = 0.15 * math.sin(2 * math.pi * 220 * t) + 0.05 * math.sin(2 * math.pi * 440 * t)
        sample = int(val * env * 32767.0)
        frames.extend(struct.pack("<h", sample))

    wav_file.writeframes(frames)

# Also create mp3 extension alias if needed
mp3_path = "public/audio/sample-story-su.mp3"
shutil.copyfile(wav_path, mp3_path)

print(f"Audio generated successfully at {wav_path} and {mp3_path} ({os.path.getsize(wav_path)} bytes)")
