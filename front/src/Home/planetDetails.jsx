import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { IoClose } from "react-icons/io5";
// Assets
import GallEarth1 from "../assets/gal-earth1.jpg"
import GallEarth2 from "../assets/gal-earth2.jpg"
import GallEarth3 from "../assets/gal-earth3.jpg"
import GallEarth4 from "../assets/gal-earth4.jpg"

const commentsData = [
    {
      id: 1,
      name: "Monica",
      time: "1h ago",
      avatar: "https://via.placeholder.com/50", // Placeholder for avatar image
      comment:
        "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      id: 2,
      name: "Larry G",
      time: "2 days ago",
      avatar: "https://via.placeholder.com/50",
      comment: "Awesome!",
    },
    {
      id: 3,
      name: "Johny",
      time: "May, 30",
      avatar: "https://via.placeholder.com/50",
      comment:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
  ];

const Home = ({setNavStatus,navStatus}) => {
    return(
        <div className={`planet_details_window ${navStatus ? 'showIt' : ''}`}>
            <div className="close" onClick={e=>setNavStatus(false)}>
                <IoClose />
            </div>
            <div className="details_content">
                <div className="infos">
                    <h1>Earth</h1>
                    <p>
                    Earth is the third planet from the Sun and the only known celestial body that supports life. It has a unique environment with vast oceans, diverse landforms, and an atmosphere rich in oxygen. Earth’s surface is 71% water, making it a "blue planet," while its ecosystems sustain millions of species. It orbits the Sun in the habitable zone, with a moderate climate regulated by its atmosphere and magnetic field.
                    </p>
                </div>
                <div className="galleries">
                    <div className="gall">
                        <img src={GallEarth1} />
                    </div>
                    <div className="gall">
                        <img src={GallEarth2} />
                    </div>
                    <div className="gall">
                        <img src={GallEarth3} />
                    </div>
                    <div className="gall">
                        <img src={GallEarth4} />
                    </div>
                </div>
                <div className="videos">
                    {/* <div className="video">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/AmrrSfiMxGA?si=BvNrDfl-aoN2rxbT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div>
                    <div className="video">
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/AmrrSfiMxGA?si=BvNrDfl-aoN2rxbT" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                    </div> */}
                </div>
                <div className="comments-container">
                    <h2>Comments</h2>
                    <div className="add-comment">
                        <textarea
                        placeholder="Write a comment..."
                        className="comment-input"
                        ></textarea>
                        <button className="add-comment-btn">
                        Post Comment
                        </button>
                    </div>
                    {commentsData.map((comment) => (
                        <div key={comment.id} className="comment">
                        <img src={comment.avatar} alt={`${comment.name}'s avatar`} className="avatar" />
                        <div className="comment-content">
                            <div className="comment-header">
                            <h4>{comment.name}</h4>
                            <span className="time">{comment.time}</span>
                            </div>
                            <p>{comment.comment}</p>
                        </div>
                        </div>
                    ))}
                    </div>
            </div>
        </div>
    )
}
export default Home;