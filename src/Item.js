import React, {Component} from "react";
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import './Item.css';

function Item({name, location, photo, description}) {
    return <div className="Item">
        <div className="Item__Column">
            <MatzipPhoto photo={photo} alt={name}/>
        </div>
        <div className="Item__Column">
            <h1>{name}</h1>
            <div className="Item__Location">
                <MatzipLocation location={location}/>
            </div>
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
    
    let res = Buffer.from(photo.data, 'binary').toString('base64');
    //console.log(res.length);
    return (
        <img src={'data:multipart/form-data;base64,'+res} alt={alt} title={alt} className="Item__Photo"/>
        //<ImageLoader file={new Blob([photo.data], {type:'image/png'})} alt={alt} className="Item__Photo"/>
    )
}

function MatzipLocation({location}) {
    return (
        <span className="Item__Location">{location}</span>
    )
}


Item.propTypes = {
    name: PropTypes.string.isRequired,
    //photo: PropTypes.string.isRequired, //음.. 고민좀
    description: PropTypes.string.isRequired,
    location: PropTypes.string
}

MatzipPhoto.propTypes = {
    //photo: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired
}

export default Item;