import './Main.css';
import pic from "./exampleBanner.jpg";
function Banner(){
    return(
        <div className="banner">
            <div className="banner__center">
                <div className="banner__center__left">
                    <img className="banner__center__left__img" src={pic}></img>
                    <div className="banner__center__left__progress">
                        <div>

                        </div>
                    </div>
                    
                </div>

                <div className="banner__center__right">
                    <div className="banner__center__right__top">
                        <div className="banner__center__right__top__img">
                           {/*  <img></img>
                            <img></img>
                            <img></img>     */}
                        </div>
                        <h2>Nombre</h2>
                        <p>date</p>
                    </div>

                </div>
            </div>
            

        </div>

    )}

    export default Banner;