import { createConsumer } from "@rails/actioncable";

const cable = createConsumer(import.meta.env.VITE_WS_URL || "ws://localhost:3001/cable");

export default cable;
