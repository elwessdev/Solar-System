import "./admin.scss";


const Comments = () => {
    return(
        <div className="planets_manage">
            <table className="planets-table">
                <thead>
                    <tr>
                    <th>Username</th>
                    <th>Post name</th>
                    <th>Comment</th>
                    <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Ahmed</td>
                        <td>Mars</td>
                        <td>The Red Planet, known for its iron oxide-rich surface. </td>
                        <td>
                            <button className="btn details">Approve</button>
                            <button className="btn details">Decline</button>
                            <button className="btn delete">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Comments;