/* eslint-disable react/react-in-jsx-scope */
import withApollo from "next-with-apollo";
import ApolloClient, { InMemoryCache } from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

export default withApollo(
  ({ initialState }) => {
    return new ApolloClient({
      uri: "https://graphql.fauna.com/graphql",
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_FAUNA_SECRET}`,
      },
      cache: new InMemoryCache().restore(initialState || {}),
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    },
  }
);
