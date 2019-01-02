import React, {Component} from 'react';
import classes from './Modal.css';
import Aux from '../../hoc/_aux';
import Overlay from '../Overlay/Overlay';
import StarRatings from 'react-star-ratings';

class Modal extends Component {
    render() {
        let book = '';
        if (this.props.currentBook && this.props.currentBook.length > 0) {
            let currentBook = this.props.currentBook[0];
            const authors = Object
                .keys(currentBook.authors)
                .map((key) => {
                    return <span className={classes.Author} key={currentBook.authors[key].id}>by {currentBook.authors[key].name}</span>
                })
            book = <div key={currentBook.id}>
                <span className={classes.Close} title="Close" onClick={this.props.modalClose}>x</span>
                <div className={classes.Card} key={currentBook.title}><img src={currentBook.image_url} alt='Not found'/></div>
                <div>
                    <span className={classes.Title}>{currentBook.title}</span>
                    {authors}

                    <span className={classes.AverageRating}><StarRatings
                        rating={parseInt(currentBook.average_rating)}
                        starDimension="20px"
                        starRatedColor="orange"
                        starSpacing="5px"/> {currentBook.average_rating}</span>
                    <span
                        className={classes.Description}
                        dangerouslySetInnerHTML={{
                        __html: currentBook.description || 'No description found'
                    }}></span>
                </div>

            </div>
        } else if (this.props.isDisplayLoader) {
            book = <div>Loading...</div>
        }
        return (
            <Aux>
                <Overlay clicked={this.props.modalClosed} show={this.props.show}/>
                <div
                    className={classes.Modal}
                    style={{
                    transform: this.props.show
                        ? 'translateY(0)'
                        : 'translateY(-100vh)',
                    opacity: this.props.show
                        ? '1'
                        : '0'
                }}>
                    {book}
                </div>
            </Aux>
        );
    }
}

export default Modal;