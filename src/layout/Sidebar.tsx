import { NavUser } from "../components/NavUser";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import type { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Profile from "../assets/shdcn.jpg";
import { setData } from "@/store/slice/messageSlice";
import { FetchUsers } from "@/services/userApi";
import type { UserItem } from "@/lib/utils";
import { FaUserFriends } from "react-icons/fa";

export type userData = {
    _id: string;
    userName: string;
    email: string;
    password: string;
    role: string;
    createdAt: string;
    updatedAt: string;
    avatar: string;
};

export type UsersProp = {
    label: string;
    value: string;
};

const AppSidebar = () => {
    const [activeTab, setActiveTab] = useState<string>("main");
    const [popOver, setPopOver] = useState<boolean>(false);
    const [Users, setUsers] = useState<UsersProp[]>([]);

    const { userData } = useSelector((state: RootState) => state.user);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const userWithAvatar: userData = {
        ...userData,
        avatar: "/src/assets/shdcn.jpg",
    };

    const FetchData = async () => {
        try {
            const response = await FetchUsers();
            const user = response.data.data.map((users: UserItem) => {
                return {
                    label: users.userName,
                    value: users._id,
                };
            });
            const NewUser = user.filter(
                (usr: UsersProp) => usr.value !== userData._id
            );
            setUsers(NewUser);
        } catch (err) {
            console.log(err);
        }
    };

    const HandleData = (data: UsersProp) => {
        dispatch(setData(data));
        navigate("/chat");
    };

    useEffect(() => {
        setActiveTab(location.pathname);
    }, [activeTab, location.pathname]);

    useEffect(() => {
        FetchData();
    }, []);

    return (
        <div className="">
            <Sidebar collapsible="icon" className="bg-blue-400">
                <SidebarHeader>
                    <div className="flex justify-end">
                        <SidebarTrigger className="" />
                    </div>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <Collapsible
                                open={popOver}
                                onOpenChange={setPopOver}
                                className="w-full"
                            >
                                <CollapsibleTrigger className="w-full">
                                    <div className="flex justify-between mx-3 items-center">
                                        <p className="font-medium flex flex-row items-center text-[16px]">
                                            <FaUserFriends />
                                            <span className="ml-3">
                                                Friends
                                            </span>
                                        </p>
                                        <ChevronDown
                                            className={`w-5 h-5 transition ${
                                                popOver ? "rotate-180" : ""
                                            }`}
                                        />
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-2">
                                    <SidebarMenu className="space-y-1 px-3">
                                        {Users.map((user: UsersProp) => (
                                            <SidebarMenuItem key={user.value}>
                                                <SidebarMenuButton
                                                    onClick={() =>
                                                        HandleData(user)
                                                    }
                                                >
                                                    <Avatar>
                                                        <AvatarImage
                                                            src={Profile}
                                                            className="w-8 h-8 rounded-full"
                                                        />
                                                    </Avatar>
                                                    {user.label}
                                                </SidebarMenuButton>
                                            </SidebarMenuItem>
                                        ))}
                                    </SidebarMenu>
                                </CollapsibleContent>
                            </Collapsible>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <NavUser user={userWithAvatar} />
                </SidebarFooter>
            </Sidebar>
        </div>
    );
};

export { AppSidebar };
