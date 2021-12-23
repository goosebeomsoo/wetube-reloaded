import "./db";
import "./models/video";
import "./models/user";
import app from "./server";

const PORT = 4000;
// PORT value setting

const handleListening = () => console.log(`✅Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
// server.js에서 정의된 app