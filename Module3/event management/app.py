from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)


def create_database():
    conn = sqlite3.connect("events.db")
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            date TEXT NOT NULL,
            time TEXT NOT NULL,
            venue TEXT NOT NULL,
            organizer TEXT NOT NULL,
            description TEXT
        )
    """)

    conn.commit()
    conn.close()


@app.route("/")
def home():
    return render_template("index.html")


# CREATE EVENT API
@app.route("/api/events", methods=["POST"])
def add_event():

    data = request.get_json()

    name = data.get("name")
    date = data.get("date")
    time = data.get("time")
    venue = data.get("venue")
    organizer = data.get("organizer")
    description = data.get("description")

    if not all([name, date, time, venue, organizer]):
        return jsonify({
            "success": False,
            "message": "Please fill all required fields"
        }), 400

    conn = sqlite3.connect("events.db")
    cursor = conn.cursor()

    cursor.execute("""
        INSERT INTO events
        (name, date, time, venue, organizer, description)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        name,
        date,
        time,
        venue,
        organizer,
        description
    ))

    conn.commit()
    conn.close()

    return jsonify({
        "success": True,
        "message": "Event created successfully!"
    })


# GET ALL EVENTS API
@app.route("/api/events", methods=["GET"])
def get_events():

    conn = sqlite3.connect("events.db")
    conn.row_factory = sqlite3.Row

    cursor = conn.cursor()

    cursor.execute("""
        SELECT * FROM events
        ORDER BY date
    """)

    events = [dict(row) for row in cursor.fetchall()]

    conn.close()

    return jsonify(events)


if __name__ == "__main__":
    create_database()
    app.run(debug=True)