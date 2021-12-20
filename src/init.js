import "./db";
import "./models/video";
import app from "./server";

const PORT = 4000;
// PORT value setting

const handleListening = () => console.log(`✅Server listening on port http://localhost:${PORT}`);

app.listen(PORT, handleListening); 