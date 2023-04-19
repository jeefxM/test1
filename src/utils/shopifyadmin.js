//Storefront Admin

export const shopifyAdmin = async (query, variables) => {
  const res = await fetch('http://localhost:3000/api/shopifyadmin', {
    method:'POST',
    body: JSON.stringify({query, variables })
  })
  const data = await res.json()
  return data

}


export const checkCustomerId = async (email) => {
  const res = await shopifyAdmin(`query($email: String!){
      customers(first:100, query: $email){
        edges{
          node{
            id
            verifiedEmail
          }
        }
      }
    }`, email)
  
  return res.data
}



// updateCollection

// input:{
//   id:"gid://shopify/Collection/452452909377",
//   image:{src:"https://i.imgur.com/opQSg0t_d.webp?maxwidth=760&fidelity=grand",
//   altText:"nice Image",},
//   descriptionHtml:"Nice Collection",
//   seo:{
//     title:"smol tuddy",
//     description:"woah"
//   }

// }




export const updateShopifyCollection = async(input) => {
const res = await shopifyAdmin(`mutation($input:CollectionInput!){
  collectionUpdate(input: $input){
    userErrors{
      message
    }
  }
    
  
  }`, input)

  return res.data
}


// input:{
//   descriptionHtml:"that's whats up",
//   handle:"yescollection",
//   title:"yescollection",
//   image:{
//     src:"#",
//     altText:"whatsup"
//   },
//   sortOrder:CREATED,
//   seo:{
//     title:"yescollection",
//     description:"that'swhatsup"
//     }


// }

export const createCollection = async(input) => {
const res = await shopifyAdmin(`mutation($input:CollectionInput!){
  collectionCreate(input:$input){
    collection{
      id
    }userErrors{
      message
      field
    }
}
}`,  input)


return res.data
}

export const stageImageUpload = async (input) => {

const res = await shopifyAdmin(`mutation($input:[StagedUploadInput!]!){
  stagedUploadsCreate(input:$input){
    stagedTargets{
      url
      resourceUrl
      parameters{
        name
        value
      }
    }
    userErrors{
      field
      message
    }
  }

}
`, input)
return res.data


}

export const createShopifyProduct = async(input) => {

const res = await shopifyAdmin(`mutation($input:ProductInput!){
  productCreate(input:$input){
    product{
      id
    }
    userErrors{
      message
      field
    }
  }
}`, input)
return res.data
}

export const publishProductToChannels = async(id) => {
const res = await shopifyAdmin(`mutation{
  publishablePublish(id:"${id}", input:[{
    publicationId:"gid://shopify/Publication/134701613377",
    
  },{publicationId:"gid://shopify/Publication/134701678913"},
  {publicationId:"gid://shopify/Publication/135117963585"},
  {publicationId:"gid://shopify/Publication/135120879937"},
  {publicationId:"gid://shopify/Publication/135259849025"},
  {publicationId:"gid://shopify/Publication/136839397697"}
  ]){
    publishable{
      publishedOnCurrentPublication
    }
    userErrors{
      message
      field
    }
  }
}`)
return res.data
}


export const deleteShopifyProduct = async (input) => {
const res = await shopifyAdmin(`mutation($input:ProductDeleteInput!){
  productDelete(input:$input){
    deletedProductId
  }
}`, input)
return res.data
}
export const deleteShopifyCollection = async (input) => {
const res = await shopifyAdmin(`mutation($input:CollectionDeleteInput!){
  collectionDelete(input:$input){
    deletedCollectionId
    userErrors{
      message
      field
    }
  }
  
}`, input)
return res.data
}

// {
//   title:"test",
//   code:"wut",
//   startsAt:"2023-04-14T07:50:00Z",
//   appliesOncePerCustomer:true,
//   usageLimit:null,

//   customerSelection: {
//     all:true
//   }
//   customerGets:{
//     items:{
//       collections:{
//         add:"gid://shopify/Collection/454159401281"
      
//       }
//     }
//     value:{
//       percentage: 0.15,
    
    
//     }
//   }


// }



export const createDiscountCode = async (name,value,id,date) => {
const res = await shopifyAdmin(`mutation{
  discountCodeBasicCreate(basicCodeDiscount:{
    title:"${name}",
    code:"${name}",
    startsAt:"${date}",
    appliesOncePerCustomer:true,
    usageLimit:null,
    
    customerSelection: {
      all:true
    }
    customerGets:{
      items:{
        collections:{
          add:"${id}"
          
        }
      }
      value:{
        percentage: ${value},
        
        
      }
    }
    
    
  }){
    codeDiscountNode{
      id
      codeDiscount{
        __typename
      }
    }
    userErrors{
      message
      field
      extraInfo
    }
    }
  }

`, )
return res.data
}


//gates

export const createGates = async (input) => {
const res = await shopifyAdmin(`mutation($input:GateConfigurationCreateInput!){
  gateConfigurationCreate(input:$input){
    gateConfiguration{
      id
      createdAt
      updatedAt
      metafields(namespace: "thirdmerch", first:10){
        nodes{
          key
          value
          namespace
          type
        }
      }
    }
    userErrors{
      message
      field
    }
  }
}`, input)


return res.data
}

export const createBasicDiscount = async input => {

  const res = await shopifyAdmin(`mutation($basicCodeDiscount: DiscountCodeBasicInput!){
    discountCodeBasicCreate(basicCodeDiscount:$basicCodeDiscount){
      codeDiscountNode{
        id
      }
      userErrors{
        message
        field
      }
    }
  }`, input)
  return res.data
}


export const createAutomaticAppDiscount = async(input) => {
const res = await shopifyAdmin(`mutation($automaticAppDiscount: DiscountAutomaticAppInput!){
  discountAutomaticAppCreate(automaticAppDiscount:$automaticAppDiscount){
    automaticAppDiscount{
      discountId
    }
    userErrors{
      code
      message
      field
    }
  }
}`, input)
return res.data
}

export const createGateSubject = async (input) => {
const res = await shopifyAdmin(`mutation($input: GateSubjectCreateInput!){
  gateSubjectCreate(input:$input){
    gateSubject{
      id
      configuration{
        id
        name
        requirements: metafield(namespace:"test",key:"requirements"){
          value
        }
        reaction: metafield(namespace:"test", key:"reaction"){
          value
        }
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
    userErrors{
      field
      message
    }
  }
}`, input)
return res.data
}

export const retrieveGatedProducts = async (query) => {
const res = await shopifyAdmin(`
query retrieveProducts ($queryString: String!, ){
  products(query: $queryString, first: 10) {
    nodes {
      id
      gates {
        id
        active
      }
    }
  }
}
`, 10)
}


export const getGatesAll = async(namespace) => {
const res = await shopifyAdmin(`query{
  gateConfigurations(first:10){
    nodes{
      id
      name
      handle
      requirements:metafield(namespace:"test",key:"requirements"){
        value
      }
      reaction:metafield(namespace:"test", key:"reaction"){
        value
      }
      subjectBindings(first:10){
        nodes{
          id
        }
      }
    }
  }
}`)
return res.data
}

export const getGate = async(id) => {
const res = await shopifyAdmin(`query($id:ID!){
  gateConfiguration(id:$id){
      id
      name
      handle
      requirements:metafield(namespace:"test",key:"requirements"){
        value
      }
      reaction:metafield(namespace:"test", key:"reaction"){
        value
      }
      subjectBindings(first:10){
        nodes{
          id
        }
      }
    }
}
  
` , id)
return res.data
}


export const productGateChecker = async(id,shopId) => {
const res = await shopifyAdmin(`query($id:ID!){
  product(id:$id){
    gates{
      id
      active
      configuration{
        id
        requirements:metafield(namespace:"${shopId.replace('gid://shopify/Collection/', '')}",key:"requirements"){
          value
        }
        reaction:metafield(namespace:"${shopId.replace('gid://shopify/Collection/', '')}", key:"reaction"){
          value
        }
      }
     
    }
  }
}`, id)
return res.data
}

export const getAllCreatedGates = async(shopId)=> {
  const res = await shopifyAdmin(`{
    gateConfigurations(first:30, query:"handle:${shopId?.replace('gid://shopify/Collection/', '')}"){
      nodes{
        handle
        id
        name
         requirements:metafield(namespace: "${shopId?.replace('gid://shopify/Collection/', '')}",key:"requirements"){
            value
          }
          reaction:metafield(namespace: "${shopId?.replace('gid://shopify/Collection/', '')}", key:"reaction"){
            value
          }
        subjectBindings(first:10){
          nodes{
            id
          }
        }
      }
    }
  }`)
  return res.data
}
