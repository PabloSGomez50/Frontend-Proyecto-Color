import './banner.css';
import pic from "../img/profile.jpg";
import React from 'react';

function Banner(){
    return(
        <div className="banner">

            <div className="banner__side">
                <div className="banner__left">
                    <img className="banner__left__img" src={pic} alt=""></img>  
                </div>

                <div className="banner__right">
                    <h2 className="banner__right__name">Luciano Agüero</h2>
                    <div className="banner__right__info">
                        <p className="banner__right__info__career">Ing electronic</p>
                        <p>Proyectos:</p>
                        <p className="banner__right__info__list">-IoT for agriculture</p>
                        <p className="banner__right__info__list">-Color web</p>
                        <p className="banner__right__info__list">-Maintainment predictive</p>
                        <p className="banner__right__info__list">-Home automation</p>
                        

                    </div>

                </div>
            </div>



            <div className="banner__center">
                <div className="banner__left">
                    <img className="banner__left__img" src={pic} alt=""></img>  
                </div>

                <div className="banner__right">
                    <h2 className="banner__center__right__name">Pablo Gomez</h2>
                    <div className="banner__right__info">
                        <p className="banner__right__info__career">Ing electronica</p>
                        <p>Proyectos:</p>
                        <p className="banner__right__info__list">-Lista</p>
                        <p className="banner__right__info__list">-Lista</p>
                        <p className="banner__right__info__list">-Lista</p>
                        <p className="banner__right__info__list">-Lista</p>
                        <p className="banner__right__info__description">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquid laudantium voluptates hic, veniam id iusto quaerat totam officiis! Asperiores voluptatem ad? Maxime?</p>


                    </div>

                </div>
            </div>

            <div className="banner__side">
                <div className="banner__left">
                    <img className="banner__left__img" src={pic} alt=""></img>  
                </div>

                <div className="banner__right">
                    <h2 className="banner__right__name">Franco Bonavena</h2>
                    <div className="banner__right__info">
                        <p className="banner__right__info__career">Ing electronica</p>
                        <p>Proyectos:</p>
                        <p className="banner__right__info__list">-Lista</p>
                        <p className="banner__right__info__list">-Lista</p>
                        <p className="banner__right__info__list">-Lista</p>
                        <p className="banner__right__info__list">-Lista</p>
                        

                    </div>

                </div>
            </div>

        </div>

    )}

    export default Banner; 