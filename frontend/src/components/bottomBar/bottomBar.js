import "../../App.css";

function BottomBar({setPageKey}){
    return(
        <div className="bottomBar">
            <div
                className="newSpeedIcon"
                onClick={() => setPageKey(0)}
            >
                NEWSPEED
            </div>
            <div
                className="postIcon"
                onClick={() => setPageKey(1)}
            >
                POST
            </div>
            <div
                className="myPageIcon"
                onClick={() => setPageKey(2)}
            >
                MYPAGE
            </div>
        </div>
    );
}

export default BottomBar;