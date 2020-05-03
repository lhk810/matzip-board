import React, {Component} from "react";
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';

function Item({title, photo, description}) {
    return <div className="Item">
        <div className="Item__Column">
            <MatzipPhoto photo={photo} alt={title}/>
        </div>
        <div className="Item__Column">
            <h1>{title}</h1>
            <div className="Item__Description">
                <LinesEllipsis
                    text = {description}
                    maxLine='6'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                />
            </div>
        </div>
    </div>
}

function MatzipPhoto({photo, alt}) {
    return (
        <img src={photo} alt={alt} title={alt} className="Item__Photo"/>
    )
}

Item.propTypes = {
    title: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired, //음.. 고민좀
    description: PropTypes.string.isRequired
}

MatzipPhoto.propTypes = {
    photo: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}

export default Item;