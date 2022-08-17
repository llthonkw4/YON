import "../../App.css";

function TopBar({setPageKey}){
    return(
        <div className="topBar">
            <div
                className="camIcon"
                onClick={() => setPageKey(1)}
            >
                CAM
            </div>
            <div
                className="logo"
                onClick={() => setPageKey(0)}
            >
                LOGO
            </div>
            <div
                className="settingIcon"
                onClick={() => setPageKey(3)}
            >
                SET
            </div>
        </div>
    );
}

export default TopBar;