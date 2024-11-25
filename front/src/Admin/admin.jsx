import "./admin.scss";
import Planets from "./planets";
import Comments from "./comments";
import { useState } from "react";

const Admin = () => {
    const [tab, setTab] = useState("planets");
    return(
        <div className="admin">
            <ul className="links">
                <li><a onClick={e=>setTab("planets")} className={tab=="planets" ?"active" :""}>Planets</a></li>
                <li><a onClick={e=>setTab("comments")} className={tab=="comments" ?"active" :""}>Comments</a></li>
                <li><a onClick={e=>setTab("users")} className={tab=="users" ?"active" :""}>Users</a></li>
                <li><a onClick={e=>setTab("quiz")} className={tab=="quiz" ?"active" :""}>Quiz</a></li>
            </ul>
            {tab=="planets" && <Planets />}
            {tab=="comments" && <Comments />}
        </div>
    )
}

export default Admin;