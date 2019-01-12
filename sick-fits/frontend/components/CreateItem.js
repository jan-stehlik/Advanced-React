import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from './styles/Form';
import formatMoney from '../lib/formatMoney';
import ErrorMessage from './ErrorMessage';
import Router from 'next/router';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

class CreateItem extends Component {
  state = {
    title: '',
    description: '',
    price: 0,
    image: '',
    largeImage: '',
  };

  handleChange = (event) => {
    const { name, type, value } = event.target;
    const val = type === 'number' ? parseFloat(value) : value;

    this.setState({ [name]: val });
  };

  handleSubmit = async (event, createItem) => {
    event.preventDefault();
    const res = await createItem();
    Router.push({
      pathname: '/item',
      query: { id: res.data.createItem.id }
    });
  };

  render() {
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => ( 
          <Form onSubmit={(event) => this.handleSubmit(event, createItem)}>
            <ErrorMessage error={error} />
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id ="title"
                  name="title"
                  placeholder="title"
                  required
                  value={this.state.title}
                  onChange={this.handleChange}
                  />
              </label>

              <label htmlFor="price">
                Price
                <input  
                  type="number"
                  id ="price"
                  name="price"
                  placeholder="price"
                  required
                  value={this.state.price}
                  onChange={this.handleChange}
                  />
              </label>

              <label htmlFor="description">
                Description
                <textarea  
                  type="number"
                  id ="description"
                  name="description"
                  placeholder="Enter a description"
                  required
                  value={this.state.description}
                  onChange={this.handleChange}
                  />
              </label>

              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
