import React, { Component } from 'react';
import { fetchMoreDrinkInfo } from '../../apiCalls/apiCalls';
import { connect } from 'react-redux';
import { showSelectDrink, toggleFavorite } from '../../actions';
import favoriteSvg from '../../images/favorite.png';
import favoriteActiveSvg from '../../images/favorite-active.png';
import './Drink.css';

export class Drink extends Component {

  handleShowMore = async () => {
    const response = await fetchMoreDrinkInfo(this.props.name)
    this.props.showSelectDrink(response)
  }

  toggleFavorite = async (name) => {
    const { favoriteCocktails, toggleFavorite } = this.props;
    const targetCocktail = await fetchMoreDrinkInfo(name.name)
    let isPresent = favoriteCocktails.find(drink => drink.name === targetCocktail.name)
    if(isPresent) {
      let filteredCocktails = favoriteCocktails.filter(cocktail => cocktail.name !== targetCocktail.name)
      toggleFavorite(filteredCocktails)
    } else {
      toggleFavorite([...favoriteCocktails, targetCocktail])
    }
  }

  render() {
    const { image, name, favoriteCocktails } = this.props;
    let favoriteImg = favoriteCocktails.find(favorite => favorite.name === name) ? favoriteActiveSvg : favoriteSvg;
    return (
      <section className="Drink_section">
        <img className="Drink_image" src={image} alt={name}/>
        <h3>{name}</h3>
        <button onClick={this.handleShowMore}>See How to Make</button>
        <label onClick={() => this.toggleFavorite({ name })}>
          <img className="Drink_image-favorite" alt="favorite this drink" src={favoriteImg}/>
          Click Here to Favorite!
        </label>
      </section>
    );
  }
}

const mapStateToProps = ({ favoriteCocktails }) => ({
  favoriteCocktails
});

const mapDispatchToProps = dispatch => ({
  showSelectDrink: targetDrink => dispatch(showSelectDrink(targetDrink)),
  toggleFavorite: cocktails => dispatch(toggleFavorite(cocktails))
});

export default connect(mapStateToProps, mapDispatchToProps)(Drink);