

export async function shopifyFetch(query, variables = {}) {
  const endpoint = "https://thirdmerch.myshopify.com/api/2023-01/graphql.json";
  const key = "7627dc0e276c4b485eb9caaac1167a12";
  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": key,
      },
      body: JSON.stringify({ query, variables }),
    });

    const data = await result.json();
    return {
      data: data,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      status: 500,
      error: "Error receiving data",
    };
  }
}


export const addBuyerInfo = async (user, line) => {

  const cartId = line[0].id.slice(line[0].id.indexOf('cart='), line[0].id.length).replace('cart=', 'gid://shopify/Cart/')

  const res = await shopifyFetch(`mutation cartBuyerIdentityUpdate($buyerIdentity: CartBuyerIdentityInput!, $cartId: ID!) {
    cartBuyerIdentityUpdate(buyerIdentity: $buyerIdentity, cartId: $cartId) {
      cart {
        checkoutUrl
      }
      userErrors {
        field
        message
      }
    }
  }`, {buyerIdentity : {
      
    email: user.email,
    countryCode: 'US',
    deliveryAddressPreferences: {
      deliveryAddress:{ 
        address1: user.address || null,
        country: "United States",
      city: user.city || null,
      firstName: user.firstName || null,
      lastName: user.lastName || null,
      zip: user.zip || null,
      phone: user.phone || null
      }
    }
  },
  cartId:cartId })

}


export const createCustomer = async (input) => {
  const res = await shopifyFetch(`
  mutation($input:CustomerCreateInput! ){
    customerCreate(input: $input){
      customerUserErrors {
        code
        field
        message
      }
      customer {
        id
      }
    }
  }`, input )
 
  return res.data
}

export const createAccessToken= async(input) => {
 

  const res = await shopifyFetch( `mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerUserErrors {
        code
        field
        message
      }
      customerAccessToken {
        accessToken
        expiresAt
      }
    }
  }`, input )

  
 
  return res.data


}








export const updateUserData = async(input) => {


  const res = await shopifyFetch(  `mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerUserErrors {
        code
        field
        message
      }
      customerAddress {
        id
      }
    }
  }`, input )
  
  return res.data
}


export const createCustomerAddress = async(input) => {
  const res = await shopifyFetch(`mutation customerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
    customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
      customerUserErrors {
        code
        field
        message
      }
      customerAddress {
        id
      }
    }
  }`,  input)

  return res.data
}


export const getCollection = async (handle, productNumber) =>{
  const res = await shopifyFetch(`
  
  {collection(handle:"${handle}"){
    id
    title
    image{
      url
    }
    products(first:${productNumber}){
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
  }`)

  return res.data
}


export const getCollections = async(count) => {
  const res = await shopifyFetch(`
  {
    collections(first:${count}){
      edges{
        node{
          handle
          title
          image{
            url
          }
        }
      }
    }
  }`)
  return res.data
}


export const getAllProducts = async(tag) =>{
  let products = []
  let endCursor = ''
  let hasNextPage = true

  while (hasNextPage) {
    const res = await shopifyFetch(`{
      products(first:100, after:${endCursor ? `"${endCursor}"` : null}, ){
        edges{
          node{
            title
            handle
            id
            priceRange{
              minVariantPrice{
                amount
              }
            }
            vendor
            tags
            featuredImage{
              url
            }
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }`)

    const responseData = res.data
    const productsData = responseData.data.products

    products = products.concat(productsData.edges.map(edge => edge.node))
    endCursor = productsData.pageInfo.endCursor
    hasNextPage = productsData.pageInfo.hasNextPage
  }

  return products
}

export const applyDiscountsCheckout = async(discountCode, checkoutId) => {
  const res = await shopifyFetch(`mutation checkoutDiscountCodeApplyV2($checkoutId: ID!, $discountCode: String!) {
    checkoutDiscountCodeApplyV2(checkoutId: $checkoutId, discountCode: $discountCode) {
      checkout {
       id
      }
      
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }`)
  return res.data
} 



export const getAllProductTags = async(tag) =>{
  let tags = []
  let endCursor = ''
  let hasNextPage = true

  while (hasNextPage) {
    const res = await shopifyFetch(`{
      products(first:10, after:${endCursor ? `"${endCursor}"` : null}, query:"tag:*"){
        edges{
          node{
            
            tags
            
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }`)

    const responseData = res.data
    const productsData = responseData.data.products

    tags = tags.concat(productsData.edges.map(edge => edge.node))
    endCursor = productsData.pageInfo.endCursor
    hasNextPage = productsData.pageInfo.hasNextPage
  }

  return tags
}


export const getAllCollections = async(tag) =>{
  let collections = []
  let endCursor = ''
  let hasNextPage = true

  while (hasNextPage) {
    const res = await shopifyFetch(`query{
      collections(first:10, after:${endCursor ? `"${endCursor}"` : null}){
        nodes{
          handle
          id
          image{
            url
          }
          description
          
          seo{
            title
            description
          }
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
      }
    }`)

    const responseData = res.data
    const collectionsData = responseData.data.collections
    collections = collections.concat(collectionsData.nodes.map(edge => edge))
    endCursor = collectionsData.pageInfo.endCursor
    hasNextPage = collectionsData.pageInfo.hasNextPage
  }

  return collections
}

export const findCollection = async (handle) => {
  const res = await shopifyFetch(`query($handle:String!){
    collection(handle:$handle){
      id
    }
  }`, {handle:handle})
  return res.data
}