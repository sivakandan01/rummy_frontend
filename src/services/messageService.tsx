import { base_url } from "@/lib/utils";
import axios from "axios";

const FetchMessages = async () => await axios.get(`${base_url}/message/`)

const FetchMessagesById = async (data: {myId: string, otherId: string}) => 
    await axios.get(`${base_url}/message/private?myId=${data.myId}&otherId=${data.otherId}`)

const AddMessage = async (data: {myId: string, otherId: string, message: string}) => 
    await axios.post(`${base_url}/message/add`, data)

export {
    FetchMessages,
    FetchMessagesById,
    AddMessage
}
