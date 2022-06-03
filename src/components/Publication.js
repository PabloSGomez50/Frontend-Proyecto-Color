import React from 'react';
import avatar from './avatar.png'
import project from './IoTProject.jpg'


function Publication(){
    return(
        <div className="publication">
                <div className="publication__left">
                    <img className="publication__left__img" src={project} alt=""></img>
                    <div className="publication__left__container">
                        <div className="publication__left__container__percentage"></div>
                    </div>
                    <div className="publication__left__value"><p>10%</p></div>
                </div>

                <div className="publication__right">
                    <div className="publication__right__top">
                        <div>
                            <img src={avatar} alt=""></img>
                            <img src={avatar} alt=""></img>
                            <img src={avatar} alt=""></img>
                        </div>
                        <h2 className="publication__center__right__name">IoT for agriculture</h2>
                        <p>00/00/00</p>
                    </div>
                    
                    <p className="publication__right__top__description">
                        En el projecto se busca optimizar el uso de agua en la agricultura, utilizando
                        IoT para automatizar procesos, medir y recolectar datos con gran exactitud.
                        para el desarrollo seran necesarios conocimientos en programacion y electronica
                        el objetivo sera desarrollar un sistema donde se obtengan mediciones de temperatura,
                        humedad, cantidad de luz y a partir de estas realizar un analisis, al alcanzar 
                        determinados umbrales realizar el riego. 
                        Se utilizara el microcontrolador esp-32 que nos permitira acceder a un prototipado rapido
                        tomando ventaja del modulo wifi que trae incorporado.
                    </p>

                </div>
            </div>
    )
}

export default Publication; 