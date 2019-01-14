import React from 'react';
import PaginationStyles from './styles/PaginationStyles';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import ErrorMessage from './ErrorMessage';
import { perPage } from '../config';
import Head from 'next/head';
import Link from 'next/link';

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    itemsConnection {
      aggregate {
        count
      }
    }
  }
`;

const Pagination = props => (
  <Query query={PAGINATION_QUERY}>
    {({error, loading, data}) => {
      if (error) return <ErrorMessage>Sorry error occurred.</ErrorMessage>;
      if (loading) return <p>Loading...</p>;

      const count = data.itemsConnection.aggregate.count;
      const pages = Math.ceil(count / perPage);
      const page = props.page;
      return (
        <PaginationStyles>
          <Head>
            <title>
              Sick Fits! - Page {page} of {pages}
            </title>
          </Head>
          <Link
            prefetch
            href={{
              pathname: 'shop',
              query: { page: page - 1 }
            }}
          >
            <a className="prev" aria-disabled={page <= 1}>Prev</a>
          </Link>
          <p>Page {page} of {pages}</p>
          <p>{count} Items Total</p>
          <Link
            prefetch
            href={{
              pathname: 'shop',
              query: { page: page + 1 }
            }}
          >
            <a className="prev" aria-disabled={page >= count}>Next</a>
          </Link>
        </PaginationStyles>
      );
    }}
  </Query>
);

export default Pagination;