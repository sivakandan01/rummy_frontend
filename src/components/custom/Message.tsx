const MessageText = ({ text, time }: { text: string, time: string }) => {
    return (
        <div>
            <div className="w-[300px] h-[32px] border border-gray-300 flex items-center rounded-md px-4 py-5 bg-white">
                <p>{text}</p>
            </div>
            <div className="flex justify-end">
                <p className="text-gray-500 text-[12px]">{time}</p>
            </div>
        </div>
    );
};

export default MessageText;
