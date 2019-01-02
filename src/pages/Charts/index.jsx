import React, { Component } from 'react';
import request from 'superagent';
import Plot from 'react-plotly.js';


// layout
import LayoutDefault from '../../layout/Default';


// components
import PageHero from '../../components/PageHero';
import Loading from '../../components/Loading';


class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      response: null,
      x: [],  //bestellingcount
      y: [],  //bestellingprijs
      data: [],
      average: null,
      klantcount: null,
      geregistreerdeklantpercentage: null,
      categoriecount: [0,0,0,0,0],
      categorieprijsavg: [0,0,0,0,0],
      totalwaardevoorraadcat: [0,0,0,0,0,0],
      bestellingenperklant: null
    };
  }

  
  componentDidMount() {
    this.getProducts("api/bestelling");
    this.getProducts("api/geregistreerdeklant");
    this.getProducts("api/product?pagesize=99999");

    
    this.setState(
      {
      loading: false
      })
   
  }


  async getProducts(link) 
  {// eslint-disable-next-line
    const res = await
    request.get(`http://localhost:5000/${link}`)
    .then(response => {
      this.setState({
        response: response.body
      });
      console.log("response13", response.body);
      if (link === "api/bestelling")
      {
      let bestellingcount = [];
      let bestellingprijs = [];
      let avg = 0;
      let avgscrewthisshit = [];
      for (let i = 0; i < response.body.length; i++) 
      {
        bestellingcount.push(response.body[i].id);
        bestellingprijs.push(response.body[i].prijs);
        avg = avg + response.body[i].prijs;
      }
      avgscrewthisshit.push(avg/response.body.length);
      this.setState({
        x: bestellingcount,
        y: bestellingprijs,
        average: avgscrewthisshit
      });
    }
    if (link === "api/geregistreerdeklant")
    {
      let klantcountarray = [0];
      let bestellingenperklant = [];
      klantcountarray[0] = response.body.length;
      bestellingenperklant[0] = this.state.x.length/response.body.length
      this.setState({
        klantcount: klantcountarray,
        bestellingenperklant: bestellingenperklant
      });
    }
    if (link === "api/product?pagesize=99999")
    {
      let categoriecount = [0,0,0,0,0]
      let categorieprijsavg = [0,0,0,0,0]
      let totalwaardevoorraadcat = [0,0,0,0,0,0]
      for (let i = 0; i < (response.body.length-1); i++) 
      {
        categoriecount[response.body[i].categorieID-1] = categoriecount[response.body[i].categorieID-1]+1;
        categorieprijsavg[response.body[i].categorieID-1] =
         categorieprijsavg[response.body[i].categorieID-1]+response.body[i].prijs;
        totalwaardevoorraadcat[response.body[i].categorieID-1] =
        totalwaardevoorraadcat[response.body[i].categorieID-1]+(response.body[i].prijs*response.body[i].voorraad);
      }
      for (let i = 0; i < totalwaardevoorraadcat.length-1; i++) 
      {
        totalwaardevoorraadcat[5] = totalwaardevoorraadcat[5]+totalwaardevoorraadcat[i]
      }
      for (let i = 0; i < categorieprijsavg.length; i++) 
      {
        categorieprijsavg[i] = categorieprijsavg[i]/categoriecount[i]
      }
      this.setState({
        categoriecount: categoriecount,
        categorieprijsavg: categorieprijsavg,
        totalwaardevoorraadcat: totalwaardevoorraadcat
      });
    }
    });
  };

  

  render() {
    const { loading, response, x, y, average, klantcount, categoriecount,
      categorieprijsavg, totalwaardevoorraadcat, bestellingenperklant} = this.state;
    if (x.length === 0 || average === null || klantcount === null || categoriecount[0] === 0 ||
       categorieprijsavg <= 0 || totalwaardevoorraadcat[0] === 0 || bestellingenperklant === null) {
      return null
    }
    console.log('bestellingenperklant',bestellingenperklant[0])
    return (
      <React.Fragment>
        <LayoutDefault className="charts">
        <PageHero
            intro
            title="Welkom!"
            description="Welkom bij kamerplant inc. De website voor al uw exclusieve planten."
            image="https://www.zoover.nl/blog/wp-content/uploads/2017/12/Kamperen-in-Kroati%C3%AB-Plitvicemeren.jpeg"
          />
                      {loading ? (
              <Loading text="Producten ophalen..." />
            ) : response && x && x.length > 0 && response.length > 0  ? (
              [
   
             
                //   //  .__(.)< (MEOW)
                //   //   \___)   
                <div>
                <Plot
                data={[
                  {
                    x: x,
                    y: y,
                    type: 'bar',
                    marker: {color: 'red'},
                  }
                ]}
                layout={ {width: 420, height: 640, title: 'Bestellingen en prijs'} }
              />
              <Plot
              data={[
                {
                  x: [1],
                  y: average,
                  type: 'bar',
                  marker: {color: 'orange'},
                }
              ]}
              layout={ {width: 320, height: 640, title: 'gemiddelde totale prijs per bestelling'} }
            />
              <Plot
              data={[
                {
                  x: [1],
                  y: klantcount,
                  type: 'bar',
                  marker: {color: 'yellow'},
                }
              ]}
              layout={ {width: 320, height: 640, title: 'Aantal geregistreerde klanten'} }
            />
              <Plot
              data={[
                {
                  x: [1],
                  y: bestellingenperklant,
                  type: 'bar',
                  marker: {color: 'blue'},
                }
              ]}
              layout={ {width: 400, height: 640, title: 'Aantal bestellingen per geregistreerde klant'} }
            />
              <Plot
              data={[
                {
                  x: ['Bloembollen','Fruitbomen','Kamerplanten','Rozen','Zaden'],
                  y: categoriecount,
                  type: 'bar',
                  marker: {color: 'green'},
                }
              ]}
              layout={ {width: 470, height: 640, title: 'Aantal producten per categorie'} }
            />
            <Plot
              data={[
                {
                  x: ['Bloembollen','Fruitbomen','Kamerplanten','Rozen','Zaden'],
                  y: categorieprijsavg,
                  type: 'bar',
                  marker: {color: 'purple'},
                }
              ]}
              layout={ {width: 470, height: 640, title: 'gemiddelde prijs per product per categorie'} }
            />
            <Plot
              data={[
                {
                  x: ['Bloembollen','Fruitbomen','Kamerplanten','Rozen','Zaden','gecombineerd'],
                  y: totalwaardevoorraadcat,
                  type: 'bar',
                  marker: {color: 'brown'},
                }
              ]}
              layout={ {width: 520, height: 640, title: 'totale waarde voorraad'} }
            />
                 </div>
              ]
            ) : (
              <p>loading</p>
            )}
          {}

          

          <div className="wrapper_h">
            <div className="not-found">
              <p className="not-found__description">
              </p>
            </div>
          </div>
        </LayoutDefault>
      </React.Fragment>
    );
  }
}

export default Charts;
