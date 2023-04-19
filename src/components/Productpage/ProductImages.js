import React , {useState} from "react";
import Image from "next/image";
const ProductImages = ({ featuredImage, image, }) => {

  const [featuredImageSrc, setFeaturedImageSrc] = useState(featuredImage)
  
  function handleImageClick(event) {
    setFeaturedImageSrc(event.target.src);
  }

  const images= image?.edges.map((item, index) => {
    return(
      <div key={index} className="image bg-button w-[200px] h-[200px] rounded-md  border-button border-2 mb-5" data-image={image} >
          <img
            src={item.node.url}
            className="w-full h-[100%] object-cover rounded-md"
            onClick={handleImageClick}
            alt='cmon'
          />
        </div>
    )
  })

  return (
    <div className="product-img w-2/3 h-[auto] flex  sm:w-full gap-3   ">
      <div className="blocks flex-col sm:hidden ">
        
        {images}
      </div>
      <div className="feautred-image w-full sm:h-[300px] h-[80%]  border-button black:border-white border-2 overflow-hidden rounded-md"  data-image={featuredImage}>
        <img src={featuredImageSrc} className="w-full h-full object-cover rounded-md transition-all"   />
      </div>
    </div>
  );
};

export default ProductImages;
