import tkinter as tk
import requests
import pyttsx3

API_URL = "https://antaresse-backend.onrender.com/api/songs"

def fetch_songs():
    try:
        response = requests.get(API_URL)
        return response.json()
    except Exception as e:
        return [{"title": "Erreur de connexion", "artist": str(e), "url": ""}]

def speak(text):
    engine = pyttsx3.init()
    engine.setProperty('rate', 150)
    engine.setProperty('volume', 1.0)
    engine.say(text)
    engine.runAndWait()

def launch_interface():
    songs = fetch_songs()

    root = tk.Tk()
    root.title("ANTARESSE")
    root.configure(bg="black")
    root.geometry("500x400")

    title = tk.Label(root, text="ANTARESSE", font=("Helvetica", 24), fg="white", bg="black")
    title.pack(pady=20)

    for song in songs:
        frame = tk.Frame(root, bg="black")
        frame.pack(pady=5)

        label = tk.Label(frame, text=f"{song['title']} — {song['artist']}", fg="cyan", bg="black", font=("Helvetica", 12))
        label.pack(side="left")

        button = tk.Button(frame, text="🔊", command=lambda s=song: speak(s["title"]), bg="gray", fg="white")
        button.pack(side="right")

    root.mainloop()

if __name__ == "__main__":
    launch_interface()