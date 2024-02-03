import React from "react";
import { Link } from "react-router-dom";
import appwriteService from '../appwrite/config'



function  PostCard({$id,title,featuredImage}) {
  const img = appwriteService.getFilePreview(featuredImage);
  // console.log(img);
  return(
    <Link to={`/post/${$id}`}>
      
        <div className=" w-full    rounded-2xl">
            <div className=" w-full  justify-center  mb-4">
            
                <img src={img} alt={title} className="  rounded-xl" />
            </div>
        </div>    
        <h2 className=" text-2xl  font-bold">
            {title}
        </h2>
    </Link>
  );
}

export default PostCard;
