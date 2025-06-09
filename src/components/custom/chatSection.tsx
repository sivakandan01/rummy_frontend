import { Avatar, AvatarImage } from "../ui/avatar";
import MessageText from "./Message";
import Profile from "../../assets/shdcn.jpg";
import { useState, type SetStateAction } from "react";
import type React from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { setData } from "@/store/slice/messageSlice";
import type { ChatArrayProp } from "@/pages/chat";
import { MdSend } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";

type ChatProp = {
    name: string;
    messages: ChatArrayProp[];
    message: string;
    setMessage: React.Dispatch<SetStateAction<string>>;
    send: () => void;
};

const ChatSection = ({
    name,
    messages,
    message,
    setMessage,
    send,
}: ChatProp) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate()
    const [popOver, setPopOver] = useState<boolean>(false);

    return (
        <div>
            <div className="h-[70px] border-b flex items-center">
                <div className="mx-6 flex justify-between w-full">
                    <div className="flex flex-row items-center">
                        <Avatar>
                            <AvatarImage
                                src={Profile}
                                className="w-[45px] h-[45px] rounded-full"
                            />
                        </Avatar>
                        <p className="ml-5 font-medium ">{name}</p>
                    </div>
                    <div className="flex items-center">
                        <Popover open={popOver} onOpenChange={setPopOver}>
                            <PopoverTrigger>
                                <BsThreeDotsVertical />
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-[150px] h-[40px] mt-2 flex items-center"
                                align="start"
                            >
                                <button
                                    className="w-full flex flex-row items-center justify-evenly"
                                    onClick={() => {
                                        dispatch(setData({}))
                                        navigate("/main")
                                    }}
                                >
                                    <IoMdClose />
                                    <span> Close Chat </span>
                                </button>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
            </div>
            <div className="h-[600px] overflow-y-auto bg-green-100">
                <div className="mx-10 my-6">
                    {messages.map((mes: ChatArrayProp, index: number) => (
                        <div
                            className={`flex mt-2 ${
                                !mes.sender ? "justify-start" : "justify-end"
                            }`}
                            key={index}
                        >
                            <MessageText text={mes.message} time={mes.time} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="border-t h-[60px] flex items-center w-full">
                <div className="flex justify-evenly w-full">
                    <input
                        type="text"
                        className="w-[90%] border-gray-300 border h-[40px] rounded-md px-2 py-1"
                        value={message}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setMessage(e.target.value)
                        }
                        placeholder="Type An Message ..."
                    />
                    <button
                        type="button"
                        className={`w-[6%] h-[40px] flex items-center justify-center border-gray-300 border rounded-md ${
                            message.length > 0 ? "bg-green-400" : "bg-gray-400"
                        }`}
                        onClick={send}
                    >
                        <MdSend />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatSection;
