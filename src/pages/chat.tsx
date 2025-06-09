/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import ChatSection from "@/components/custom/chatSection";
import type { MessageProp } from "@/lib/utils";
import { FetchMessagesById } from "@/services/messageService";
import socket from "@/store/socket/socket";
import type { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export type ChatArrayProp = {
    message: string;
    time: string;
    sender: boolean;
};

const Chat = () => {
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<ChatArrayProp[]>([]);
    const [received, setReceived] = useState<boolean>(true);

    const { userData } = useSelector((state: RootState) => state.user);
    const { data } = useSelector((state: RootState) => state.data);

    useEffect(() => {
        if (data && received) {
            Message();
        }
    }, [received]);

    const HandleData = (data: { success: boolean; message: string }) => {
        if (data.success) {
            setReceived(true);
        }
    };

    socket.on("received", HandleData);

    const ConvertIntoMessage = (data: MessageProp[]) => {
        const chat: ChatArrayProp[] = data
            .map((msg) => {
                const created = new Date(msg.createdAt);

                return {
                    sender: msg.senderId === userData._id,
                    message: msg.message,
                    time: created.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    }),
                    createdAt: created,
                };
            })
            .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
            .map(({ createdAt, ...rest }) => rest);

        setMessages(chat);
    };

    const Message = async () => {
        try {
            const response = await FetchMessagesById({
                myId: userData._id,
                otherId: data.value,
            });
            ConvertIntoMessage(response.data.data);
        } catch (err) {
            console.log(err);
        }
    };

    const HandleSend = () => {
        try {
            socket.emit("sendMessage", {
                senderId: userData._id,
                receiverId: data.value,
                message: message,
            });
            setMessage("");
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="">
            {data && (
                <ChatSection
                    message={message}
                    messages={messages}
                    setMessage={setMessage}
                    name={data.label}
                    send={HandleSend}
                />
            )}
        </div>
    );
};

export default Chat;
