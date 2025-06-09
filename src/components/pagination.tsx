import type { Dispatch, SetStateAction } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "./ui/select";
import {
    MdKeyboardArrowLeft,
    MdKeyboardArrowRight,
    MdKeyboardDoubleArrowLeft,
    MdKeyboardDoubleArrowRight,
} from "react-icons/md";

type PaginationProp = {
    limit: number;
    page: number;
    items: number;
    totalpage: number;
    setLimit: Dispatch<SetStateAction<number>>;
    setCurrent: Dispatch<SetStateAction<number>>;
};

const Pagination = ({
    limit,
    page,
    items,
    totalpage,
    setLimit,
    setCurrent,
}: PaginationProp) => {
    return (
        <div className="flex flex-row mt-8 justify-between">
            <div className="space-x-2 flex flex-row">
                <p className="">Result:</p>
                <div className="">
                    <Select value={limit} onValueChange={setLimit}>
                        <SelectTrigger>
                            <SelectValue>{limit}</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <p>
                    {limit * page} of {items}
                </p>
            </div>
            <div className="space-x-3">
                <button
                    onClick={() => setCurrent(page - 10)}
                    disabled={page - 10 <= 0}
                    className={`${page - 10 <= 0 ? "text-gray-400" : ""}`}
                >
                    <MdKeyboardDoubleArrowLeft />
                </button>
                <button
                    onClick={() => setCurrent(page - 1)}
                    disabled={page - 1 <= 0}
                    className={`${page - 1 <= 0 ? "text-gray-400" : ""}`}
                >
                    <MdKeyboardArrowLeft />
                </button>

                <span>
                    page {page} of {totalpage}
                </span>
                <button
                    onClick={() => setCurrent(page + 1)}
                    disabled={page + 1 > totalpage}
                    className={`${page + 1 > totalpage ? "text-gray-400" : ""}`}
                >
                    <MdKeyboardArrowRight />
                </button>
                <button
                    onClick={() => setCurrent(page + 10)}
                    disabled={page + 10 > totalpage}
                    className={`${
                        page + 10 > totalpage ? "text-gray-400" : ""
                    }`}
                >
                    <MdKeyboardDoubleArrowRight />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
