import "../../App.css";
import MyPage from "./myPage/myPage";
import NewSpeed from "./newSpeed/newSpeed";
import Post from "./post/post";
import SettingPage from "./settingPage/settingPage";

function MainRender({pageKey}){
    if(pageKey === 0){
        return(
            <div className="newSpeedWrap">
                <NewSpeed/>
            </div>
        );
    }
    else if(pageKey === 1){
        return(
            <div className="postWrap">
                <Post/>
            </div>
        );
    }
    else if(pageKey === 2){
        return(
            <div className="myPageWrap">
                <MyPage/>
            </div>
        );
    }
    else if(pageKey === 3){
        return(
            <div className="settingPageWrap">
                <SettingPage/>
            </div>
        )
    }
}

export default MainRender;