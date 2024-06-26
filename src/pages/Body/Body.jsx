import { Routes, Route, Navigate} from "react-router-dom";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Timeline } from "../Timeline/Timeline";
import { Profile } from "../Profile/Profile";
import { UpdateProfile } from "../UpdateProfile/UpdateProfile";
import { NewPost } from "../NewPost/NewPost";
import { SearchUsers } from "../SearchUsers/SearchUsers";
import { AdminPanel } from "../AdminPanel/AdminPanel";

export const Body = () => {
    return (
        <Routes>
            <Route path="*" element={<Navigate to={"/accounts/login"} replace/>} />
            <Route index element={<Navigate to="/accounts/login" replace />} />
            <Route path="/accounts/login" element={<Login />} />
            <Route path="/accounts/register" element={<Register />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/edit" element={<UpdateProfile />} />
            <Route path="/post/create" element={<NewPost />} />
            <Route path="/search" element={<SearchUsers />} />
            <Route path="/admin" element={<AdminPanel />} />
        </Routes>
    );
};