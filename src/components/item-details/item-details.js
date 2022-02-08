import React, { Component } from 'react';

import './item-details.css';

import Spinner from "../spinner";
import ErrorButton from "../error-button";

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};
export { Record };

export default class ItemDetails extends Component {

    state = {
        item: null,
        loading: true,
        image: null,
        error: false
    };

    componentDidMount(){
        this.updateItem();
    }

    componentDidUpdate(prevProps){
        if (this.props.itemId !== prevProps.itemId ||
            this.props.getData !== prevProps.getData ||
            this.props.getImageUrl !== prevProps.getImageUrl) {
            this.updateItem();
        }
    }

    updateItem(){
        this.setState({ loading: true });
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            this.setState({ loading: false });
            return;
        }
        const item = getData(itemId);
        const image = getImageUrl(itemId)

        Promise.all([item, image])
            .then(([item, image]) => {
                this.setState({ item: item, loading: false, image: image });
            }).catch(()=>{
                this.setState({ error: true });
            });
    }

    render(){

        const { item, loading, image, error } = this.state;

        const errorMessage = error ? <h4>No such planet exists</h4> : null
        const spinner = (loading && !error) ? <Spinner/> : null;
        const defaultContent = !(item || loading) ? <span>Select a item from a list</span> : null;
        let content = null;
        if (item && !loading && !error) {
            content = (
                <ItemView item={item} image={image}>{this.props.children}</ItemView>
            )
        }

        return (
            <div className="item-details card">
                {errorMessage}
                {content}
                {spinner}
                {defaultContent}
            </div>
        )
    }
}

const ItemView = ({ item, image, children }) => {

    const { name } = item;

    return (
        <React.Fragment>
            <img className="item-image"
                 src={image} alt=""/>

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, { item });
                        })
                    }
                </ul>
                <ErrorButton/>
            </div>
        </React.Fragment>
    );
};
