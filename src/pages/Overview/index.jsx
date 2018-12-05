import React, { Component } from "react";
import { Link } from "react-router-dom";
import request from "superagent";


// layout
import LayoutDefault from "../../layout/Default";

// components
import Loading from "../../components/Loading";
import ProductGrid from "../../components/ProductGrid";
import Pagination from "../../components/Pagination";

class Overview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      response: null
    };
  }

  componentWillReceiveProps(nextProps) {
    const currentParams = this.props.match.params;
    const nextParams = nextProps.match.params;
    if (currentParams.page !== nextParams.page) {
      this.getProducts(nextParams.page);
    }

  }

  componentDidMount() {
    console.log("this.props", this.props);
    this.getProducts(this.props.match.params.page);

  }

  getProducts(page) {
    this.setState({
      response: null,
      loading: true
    });
    //console.log(page);
    



    
    request
      .get(`http://localhost:5000/api/product/`)
     // .get(`https://jsonplaceholder.typicode.com/users/`)
      .then(response => {

       
     
      console.log("response321", response);
        this.setState({
          response: response.body,
          loading: false
        });
        console.log("response32", response.body);
      });
  }

  render() {
    const { loading, response } = this.state;
    return (
      <React.Fragment>
        
        <LayoutDefault simple="true" className="overview">
          <div className="wrapper">
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

export default Overview;
