import React, { useEffect } from 'react'

const FeedbackPage = () => {
  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://youtrack.rationai.cloud.e-infra.cz/static/simplified/form/form-entry.js";
  
    document.body.appendChild(script);
  }, []);
  
  return (<div id='c5d3a8aa-1400-496a-9258-93bf0a2d2df3'></div>)
}

export default FeedbackPage