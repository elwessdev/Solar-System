import "./popup.scss";

const PlanetPopup = ({closePop}) => {
    return(
        <div className="popup">
            <div className="popup-content">
                <div className="close" onClick={e=>closePop(false)}>
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"></path></svg>
                </div>
                <h3 className="title">Add Planet</h3>
                <div className="pop-planet">
                    <form>
                        <div className="sec">
                            <h3>Details</h3>
                            <input type="text" placeholder="Photo (link)" />
                            <input type="text" placeholder="Planet name" />
                            <input type="text" placeholder="Distance au Soleil" />
                            <input type="text" placeholder="Masse" />
                            <textarea placeholder="Description"></textarea>
                        </div>
                        <div className="sec">
                            <h3>Gallery</h3>
                            <input type="text" placeholder="Image 1 (link)" />
                            <input type="text" placeholder="Image 2 (link)" />
                            <input type="text" placeholder="Image 3 (link)" />
                            <input type="text" placeholder="Image 1 (link)" />
                        </div>
                        <div className="sec">
                            <h3>Videos</h3>
                            <input type="text" placeholder="Videos 1 (Youtube link)" />
                            <input type="text" placeholder="Videos 2 (Youtube link)" />
                        </div>
                        <button>Save</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PlanetPopup;