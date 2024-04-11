import { Routes, Route, Navigate} from "react-router-dom";
import { Login } from "../Login/Login";
import { Register } from "../Register/Register";
import { Timeline } from "../Timeline/Timeline";
import { Profile } from "../Profile/Profile";
import { UpdateProfile } from "../UpdateProfile/UpdateProfile";

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
        </Routes>
    );
};