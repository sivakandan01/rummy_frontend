import { base_url } from "@/lib/utils"
import { io } from "socket.io-client";

const socket = io(base_url)

export default socket