import React, { Component } from "react";
import { Link } from "react-router-dom";
import request from "superagent";


// layout
import LayoutDefault from "../../layout/Default";

// components
import Loading from "../../components/Loading";
import ProductGrid from "../../components/ProductGrid";
import Pagination from "../../components/Pagination";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      response: null,
      query: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const currentParams = this.props.match.params;
    const nextParams = nextProps.match.params;
    if (currentParams.page !== nextParams.page) {
      this.getProducts(nextParams.page,this.state.query);
    }

  }

  componentDidMount() {
    console.log("this.props", this.props);
    this.getProducts(this.props.match.params.page,this.state.query);

  }
  handleInputChange = () => {
    this.setState({
      query: this.search.value
    
     
    })
    this.getProducts(this.props.match.params.page,this.state.query);
  }

  getProducts(page,query) {
    // this.setState({
    //   response: null,
    //   loading: true
    // });
    //console.log(page);
    



    
    request
      .get(`http://localhost:5000/api/product/`)
     // .get(`https://jsonplaceholder.typicode.com/users/`)
      .then(response => {
       var searchresult =  response.body.filter(function(product) {
        
        

        //search is case sensitive atm
        console.log("statefuck", query);
        return product.naam.includes(query);
       
        });
      console.log("response321", response);
        this.setState({
          //response: response.body,
          response: searchresult,
          loading: false
        });
        console.log("response32", response.body);
      });
  }

  render() {
    const { loading, response } = this.state;
    return (
      <React.Fragment>
        
        <LayoutDefault simple="true" className="Search">
          <div className="wrapper">
          <form>
        <input
          placeholder="Search for..."
          ref={input => this.search = input}
          onChange={this.handleInputChange}
        />
        
      </form>
            {loading ? (
              <Loading text="Producten ophalen..." />
            ) : response && response && response.length > 0  ? (
              [
                <Pagination
                  perPage={response.per_page}
                  totalPages={response.total_pages}
                  currentPage={response.page}
                  key="pagination"
             
                  //  .__(.)< (MEOW)
                  //   \___)   

                />,
                
                <ProductGrid items={response} key="grid" />
                
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

export default Search;