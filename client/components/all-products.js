import React from 'react'
import Navbar from './navbar';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export class AllProducts extends React.Component {
  componentDidMount() {
    // this.props.getProjects();
  }

  render() {
    return (
      <div>
        <nav>
          {Navbar}
        </nav>
        <div>
          {this.props.products.map((project) => (
            <div key={project.id}>
              <Link to={`/projects/${project.id}`}>
                <h3>{product.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

// name, price, image

const mapState = (state) => {
  return {
    projects: state.products,
  }
}

const mapDispatch = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
})

export default connect(mapState, mapDispatch)(AllProducts)
