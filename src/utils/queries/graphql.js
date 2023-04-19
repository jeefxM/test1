const gql = String.raw;

export const GET_STORE = gql`
  query {
    shop {
      name
    }
  }
`;

export const GET_HOMEPAGE_ITEMS = `{collection(handle:"frontpage", ){
    products(first:5){
      edges{
        node{
          id
          title
          vendor
          variants(first:1){
            edges{
              node{
                price{
                  amount
                }
                compareAtPrice{
                  amount
                }
                
              }
            }
          }

          description
           featuredImage{
            url
          }
         
        }
      }
    }
  }}
  
  `;

  

  export const getExclusives =`
  
  {collection(handle:"exclusives"){
    id
    title
    products(first:10){
      edges{
        node{
          title
          id
          description
          vendor
          featuredImage{
            url
          }
          variants(first:10){
            edges{
              node{
                price{
                  amount
                }
              }
            }
          }
          
        }
      }
    }
  }
}`


export const createGates = `
mutation {
  productUpdate(
    input: {
      id: "gid://shopify/Product/8201650307393",
      gateConfigurations: [
        {
          conditions: [
            {
              key: "tokengating.is_tokengated"
              operator: EQUALS
              values: ["true"]
            }
          ]
        }
      ]
    }
  ) {
    product {
      id
      title
      gateConfigurations(first: 10) {
        edges {
          node {
            id
            conditions {
              key
              operator
              values
            }
          }
        }
      }
    }
  }
}`