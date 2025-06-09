import { FaChessKing } from "react-icons/fa";
import { MdGroups } from "react-icons/md";

const Main = () => {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-amber-50">
            <div className="w-[300px] h-[120px] flex flex-col justify-between gap-4">
                <button 
                    className="ripple w-full h-[42px] flex items-center justify-center border rounded-md bg-green-200 shadow-lg"
                    style={{
                        '--button-bg-color': '#bbf7d0', 
                        '--button-active-color': '#86efac' 
                    } as React.CSSProperties}
                >
                    <FaChessKing className="z-10" />
                    <span className="ml-3 font-medium z-10">Create Game</span>
                </button>

                <button 
                    className="ripple w-full h-[42px] flex items-center justify-center border rounded-md bg-blue-200 shadow-lg"
                    style={{
                        '--button-bg-color': '#bfdbfe', 
                        '--button-active-color': '#93c5fd' 
                    } as React.CSSProperties}
                >
                    <MdGroups className="h-6 w-6 z-10" />
                    <span className="ml-3 font-medium z-10">Join Game</span>
                </button>
            </div>
        </div>
    );
};

export default Main;
