const eventForm = document.getElementById("eventForm");

// CREATE EVENT

eventForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const eventData = {
    name: document.getElementById("name").value,

    date: document.getElementById("date").value,

    time: document.getElementById("time").value,

    venue: document.getElementById("venue").value,

    organizer: document.getElementById("organizer").value,

    description: document.getElementById("description").value,
  };

  try {
    const response = await fetch("/api/events", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(eventData),
    });

    const result = await response.json();

    const message = document.getElementById("message");

    if (result.success) {
      message.className = "alert alert-success mt-3";

      message.innerText = result.message;

      eventForm.reset();

      loadEvents();
    } else {
      message.className = "alert alert-danger mt-3";

      message.innerText = result.message;
    }
  } catch (error) {
    console.log(error);

    document.getElementById("message").className = "alert alert-danger mt-3";

    document.getElementById("message").innerText = "Server connection failed.";
  }
});

// GET EVENTS

async function loadEvents() {
  try {
    const response = await fetch("/api/events");

    const events = await response.json();

    const eventList = document.getElementById("eventList");

    eventList.innerHTML = "";

    if (events.length === 0) {
      eventList.innerHTML = `
                <div class="col-12">
                    <div class="alert alert-info">
                        No events available.
                    </div>
                </div>
            `;

      return;
    }

    events.forEach(function (event) {
      eventList.innerHTML += `

                <div class="col-md-6 col-lg-4">

                    <div class="card event-card shadow-sm">

                        <div class="card-body">

                            <h4 class="event-title">
                                ${event.name}
                            </h4>

                            <hr>

                            <div class="event-info">
                                <strong>Date:</strong>
                                ${event.date}
                            </div>

                            <div class="event-info">
                                <strong>Time:</strong>
                                ${event.time}
                            </div>

                            <div class="event-info">
                                <strong>Venue:</strong>
                                ${event.venue}
                            </div>

                            <div class="event-info">
                                <strong>Organizer:</strong>
                                ${event.organizer}
                            </div>

                            <p class="description">
                                ${event.description || "No description"}
                            </p>

                        </div>

                    </div>

                </div>

            `;
    });
  } catch (error) {
    console.log(error);
  }
}

// Load events when page opens

loadEvents();
