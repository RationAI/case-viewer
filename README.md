## Dev

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## App specific
### Job handling
To add a new app/job to deployment, you need to provide image, EAD (other parts of deployment), and for this case browser, you need to upload a config similar to EAD, that specifies Inputs and Outputs of given job, and rules how to generate visualizations from them. This should be stored as a global item that references the app
Example:
{ 
  "name": "...",
  "description": "...",
  "appId": "..."
  "modes": {
      "preprocessing": {
          "inputs": {
              "analyzed_scan": {
                "_layer_loc": "background",
                "lossless": false,
                "protocol": "`{\"type\":\"leav3\",\"slide\":\"${data}\"}`"
              }
          },
          "outputs": {
              "prediction_mask": {
                "_layer_loc": "shader",
                "name": "Cancer prediction",
                "type": "heatmap",
                "visible": 1,
                "protocol": "`{\"type\":\"leav3\",\"pixelmap\":\"${data}\"}`",
                "params": {
                  "opacity": 0.5,
                }
              },
              "background_mask": {
                "_layer_loc": "shader",
                "name": "Mask",
                "type": "heatmap",
                "visible": 1,
                "protocol": "`{\"type\":\"leav3\",\"pixelmap\":\"${data}\"}`",
                "params": {
                  "threshold": 0.5,
                  "use_mode": "mask_clip",
                }
              },
          }
      }
  }
}

{
  "name": "...",
  "description": "...",
  "appId": "..."
  "modes": {
      "preprocessing": {
          "inputs": {
              "analyzed_scan": {
                "_layer_loc": "background",
                "lossless": false,
                "protocol": "`{\"type\":\"leav3\",\"slide\":\"${data}\"}`"
              }
          },
          "outputs": {
              "prediction_mask": {
                "name": "Cancer prediction",
                "type": "heatmap",
                "visible": 1,
                "protocol": "`{\"type\":\"leav3\",\"pixelmap\":\"${data}\"}`",
                "params": {
                  "opacity": 0.5,
                }
              },
          }
      }
  }
}

{
  "name": "...",
  "description": "...",
  "appId": "..."
  "modes": {
      "preprocessing": {
          "inputs": {
              "analyzed_scan": {
                "_layer_loc": "background",
                "lossless": false,
                "protocol": "`{\"type\":\"leav3\",\"slide\":\"${data}\"}`"
              }
          },
          "outputs": {
              "background_mask": {
                "name": "Mask",
                "type": "heatmap",
                "visible": 1,
                "protocol": "`{\"type\":\"leav3\",\"pixelmap\":\"${data}\"}`",
                "params": {
                  "threshold": 0.5,
                  "opacity": 0.5,
                }
              },
          }
      }
  }
}

!IMPORTANT! Both outputs are optional, job outputs at least one of these pixelmaps.


{ 
  "name": "Prostate job",
  "description": "This is a description of prostate job",
  "appId": "4e485b74-413e-477d-8e09-2c38ae57e582"
  "modes": {
      "preprocessing": {
          "inputs": {
              "my_wsi": {
                "_layer_loc": "background",
                "lossless": false,
                "protocol": "`{\"type\":\"leav3\",\"slide\":\"${data}\"}`"
              }
          },
          "outputs": {
              "probability_mask": {
                "_layer_loc": "shader",
                "name": "Cancer prediction",
                "type": "heatmap",
                "visible": 1,
                "protocol": "`{\"type\":\"leav3\",\"pixelmap\":\"${data}\"}`",
                "params": {
                  "opacity": 0.5,
                }
              },
              "background_mask": {
                "_layer_loc": "shader",
                "name": "Mask",
                "type": "heatmap",
                "visible": 1,
                "protocol": "`{\"type\":\"leav3\",\"pixelmap\":\"${data}\"}`",
                "params": {
                  "threshold": 0.5,
                  "use_mode": "mask_clip",
                }
              },
          }
      }
  }
}
