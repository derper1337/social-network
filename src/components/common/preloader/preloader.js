import preloader from "./Gear-1.4s-200px.svg"
import React from "react";
import css from "./Preloader.module.css"

const Preloader = (props) => {
    return <div className={css.Preloader}>
        <img src={preloader}/>
    </div>
}

export default Preloader