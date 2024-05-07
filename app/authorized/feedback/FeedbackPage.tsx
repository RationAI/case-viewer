import { useThemeDetector } from '@/app/hooks/useThemeDetector';
import React, { useEffect } from 'react'

const FeedbackPage = () => {
  const isDarkTheme = useThemeDetector();

  useEffect(() => {
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
      // TODO
    }
  }, [isDarkTheme]);
  
  return (
    <div id="youtrack-rationai-feedback"></div> 
  )
}

export default FeedbackPage