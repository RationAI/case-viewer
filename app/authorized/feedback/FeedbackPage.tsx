import { useThemeDetector } from '@/app/components/useThemeDetector';
import React, { useEffect } from 'react'

const FeedbackPage = () => {
  const isDarkTheme = useThemeDetector();

  useEffect(() => {
    const script = document.createElement('script');
  
    script.src = "https://youtrack.rationai.cloud.e-infra.cz/static/simplified/form/form-entry.js";
    script.async = true;

    script.id="c5d3a8aa-1400-496a-9258-93bf0a2d2df3";
    script.setAttribute("data-yt-url", "https://youtrack.rationai.cloud.e-infra.cz");

    script.onload = () => {
      // @ts-expect-error window type doesnt have attribute
      if(window.YTFeedbackForm) {
        // @ts-expect-error window type doesnt have attribute
        window.YTFeedbackForm.renderInline(document.getElementById("youtrack-rationai-feedback"), {
          backendURL: "https://youtrack.rationai.cloud.e-infra.cz",
          formUUID: "c5d3a8aa-1400-496a-9258-93bf0a2d2df3",
          theme: isDarkTheme ? "dark" : "light",
          language: "en",
        });
      } else {

      }
    };
  
    document.getElementsByTagName('head')[0].appendChild(script);
  }, [isDarkTheme]);
  
  return (
    <div id="youtrack-rationai-feedback"></div> 
  )
}

export default FeedbackPage