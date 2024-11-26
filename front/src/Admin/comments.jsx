import "./admin.scss";


const Comments = () => {
    return(
        <div className="manage_comments">
            <table className="planets-table">
                <thead>
                    <tr>
                        <th>N°</th>
                        <th>Username</th>
                        <th>Post name</th>
                        <th>Comment</th>
                        <th>Status</th>
                        <th>Options</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Ahmed</td>
                        <td>Mars</td>
                        <td>The Red Planet, known for its iron oxide-rich surface. </td>
                        <td>Pending</td>
                        <td>
                            <button className="nrml">Approve</button>
                            <button className="nrml">Decline</button>
                            <button className="delete">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
export default Comments;