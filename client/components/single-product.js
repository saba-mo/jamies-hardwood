import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import axios from 'axios'

export class SingleProduct extends React.Component {
  //   constructor() {
  //     super()

  //     // this.handleAddToCart = this.handleAddToCart.bind(this)
  //   }

  //   componentDidMount() {
  //     this.props.loadSingleProduct(this.props.match.params.productId)
  //   }

  //   async handleComplete() {
  //     await axios.put(`/api/projects/${this.props.project.id}`, {
  //       completed: true,
  //     })
  //     this.props.loadSingleProject(this.props.project.id)
  //   }

  render() {
    let product
    if (!this.props.product) {
      product = {
        id: 1,
        name: 'bowl',
        description: 'beautiful wooden bowl',
        quantity: 0,
        price: 20.0,
        imageUrl:
          'https://scontent.fdet1-1.fna.fbcdn.net/v/t1.0-9/48355230_2197053220325955_285086455796072448_n.jpg?_nc_cat=107&ccb=2&_nc_sid=0debeb&_nc_ohc=rcAYcAw-5VcAX9ofu4G&_nc_ht=scontent.fdet1-1.fna&oh=f62b16590bd0087ebb4caeb154646940&oe=6023BD24'
      }
    } else {
      product = this.props.product
    }

    return (
      <div>
        <h1>{product.name}</h1>
        Description: {product.description}
        <br />
        Quantity: {product.quantity}
        <br />
        Price: ${product.price}
        <br />
        <img src={product.imageUrl} />
        <br />
        <button type="submit" onClick={this.handleAddToCart}>
          Add to Cart
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    product: state.singleProduct
  }
}

const mapDispatch = dispatch => ({
  loadSingleProduct: id => dispatch(fetchSingleProduct(id))
})

export default connect(mapState, mapDispatch)(SingleProduct)
