import React, { Component } from 'react';
import request from 'superagent';

// layout
import LayoutDefault from '../../layout/Default';

// components
import PageHero from '../../components/PageHero';
import Loading from '../../components/Loading';
import ProductGrid from '../../components/ProductGrid';
import SimpleHeading from '../../components/SimpleHeading';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      response: null
    };
  }

  componentDidMount() {
    this.getFeaturedProducts();
  }

  getFeaturedProducts = () => {
    request.get(`https://reqres.in/api/product?per_page=3`).then(response => {
      this.setState({
        response: response.body,
        loading: false
      });
    });
  };

  render() {
    const { loading, response } = this.state;
    return (
      <React.Fragment>
        <LayoutDefault className="home">
          <PageHero
            intro
            title="Welkom!"
            description="Welkom bij kamerplant inc. De website voor al je exlcusieve planten. Ster door service zijn we gegroeid tot de webshop die we vandaag zijn"
            image="https://images.unsplash.com/photo-1537182534312-f945134cce34?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=3e15098b0f1917ea25a41c7908a227a5&auto=format&fit=crop&w=1920&q=100"
          />
          <div className="wrapper">
            {loading ? (
              <Loading text="Producten ophalen..." />
            ) : response && response && response.data.length > 0 ? (
              [
                <SimpleHeading
                  title="Actuele aanbiedingen"
                  description="Hier kunt u al onze actuele aanbiedingen vinden"
                  key="heading"
                />,
                <ProductGrid items={response.data} key="grid" />
              ]
            ) : (
              <p>Geen producten gevonden...</p>
            )}
          </div>
        </LayoutDefault>
      </React.Fragment>
    );
  }
}

export default Home;