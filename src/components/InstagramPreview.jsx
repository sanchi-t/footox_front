import React from "react";
import parse from 'html-react-parser';
import { InstagramEmbed } from 'react-social-media-embed';




const InstagramPreview = ({ value }) => {
  const { url } = 'https://www.instagram.com/p/Cn4uPqYPOiD/';


  return (<>
   <div style={{ display: 'flex', justifyContent: 'center' }}>
  <InstagramEmbed url="https://www.instagram.com/p/CUbHfhpswxt/" width={328} />
</div>
  </>
  );
};

export default InstagramPreview;