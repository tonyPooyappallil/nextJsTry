import path from "path";
import fs from "fs";

function buildPath() {
  return path.join(process.cwd(), "data", "data.json");
}

function extractData(filePath) {
  const jsonData = fs.readFileSync(filePath);
  return JSON.parse(jsonData);
}

export default function handler(req, res) {
  const { method } = req;

  const filePath = buildPath();
  const { events_categories, allEvents } = extractData(filePath);

  if (!allEvents)
    return res.status(404).json({
      message: "allEvents empty",
    });

  if (method === "POST") {
    const { email, eventId } = req.body;

    const newAllEvents = allEvents.map((ev) => {
      if (ev.id === eventId) {
        if (ev.emails_registered.includes(email)) {
          res
            .status(409)
            .json({ message: "This email has already been registered" });
        }
        return { ...ev, emails_registered: [...ev.emails_registered, email] };
      }
      return ev;
    });

    fs.writeFileSync(
      filePath,
      JSON.stringify({ events_categories, allEvents: newAllEvents })
    );
    res.status(200).json({
      message: `you have been successfully registered with the email  : ${email} and id ${eventId}`,
    });
  }
  if (method === "GET") {
    //add code here
    res.status(200).json({
      message: "you have successfully made the get request",
    });
  }
}
