import BottomBar from "./bottomBar/bottomBar";
import TopBar from "./topBar/topBar";
import MainRender from "./mainRender/mainRender";
import "../App.css";
import { useState } from "react";

function MainPage(){
    const [pageKey, setPageKey] = useState(0);
    // pageKeyValue ---> 0: newspeed, 1: post, 2: mypage, 3: set

    return(
        <div>
            <div className="topBarWrap">
                <TopBar
                    setPageKey={setPageKey}
                />
            </div>
            <div className="mainRenderWrap">
                <MainRender
                    pageKey={pageKey}
                />
            </div>
            <div className="bottomBarWrap">
                <BottomBar
                    setPageKey={setPageKey}
                />
            </div>
        </div>
    );
}

export default MainPage;