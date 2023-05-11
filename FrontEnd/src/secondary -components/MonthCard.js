import React from "react";
import { useNavigate } from 'react-router-dom';
import '../componentsCss/alluser.css'

const MonthCard = ({ Msheet }) => {

    const navigate = useNavigate();

    const handleDailySheetClick = () => {
        navigate(`/DailyUser/${Msheet._id}?Month=${Msheet.Month}${Msheet.Year}`);
        console.log(Msheet.Id)

    };



    return (



        <div className=" Cart">
            <div className="ft-recipe__thumb">
                <img src={require('../assets/calender.png')} alt="Calendar" />
            </div>
            <div className="Cart ft-recipe__content">
                <div className="content__header">
                    <div className="row-wrapper">
                        <span className="recipe-title">{Msheet.Month}  </span>
                      {Msheet.Status ? <img src={require('../assets/valideS.png')} height={"15px"} className="trash"></img> : <img src={require('../assets/refuseS.png')} height={"15px"} className="trash"></img>}
                        <div className="user-rating"></div>
                    </div>
                    <ul className="recipe-details">
                        <li className="recipe-details-item time">
                            <i><img src={require('../assets/icon2.png')} alt="Working days" width="35px" /></i>
                            <span className="value">{Msheet.NbrJTrav}</span>
                            <span className="title">Working</span>
                        </li>
                        <li className="recipe-details-item ingredients">
                            <i><img src={require('../assets/icon1.png')} alt="Off days" width="35px" /></i>
                            <span className="value">{Msheet.NbrJConge}</span>
                            <span className="title">DayOffs</span>
                        </li>
                        <li className="recipe-details-item servings">
                            <i><img src={require('../assets/icon3.png')} alt="Holidays" width="35px" /></i>
                            <span className="value">{Msheet.NbrJFeries}</span>
                            <span className="title">Holidays</span>
                        </li>
                    </ul>
                </div>
                <div className="content__footer">
                    <a onClick={handleDailySheetClick} >View </a>
                </div>
            </div>
        </div>




    );
};

export default MonthCard;