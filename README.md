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


await root.rationai.globalStorage.jobConfig.deleteJobConfig("4e485b74-413e-477d-8e09-2c38ae57e582");
await root.rationai.globalStorage.jobConfig.deleteJobConfig("4e485b74-413e-477d-8e09-2c38ae57e582");
await root.rationai.globalStorage.jobConfig.deleteJobConfig("4e485b74-413e-477d-8e09-2c38ae57e582");
const jobEAD = {
"name": "Prostate job",
"description": "This is a description of prostate job",
"appId": "4e485b74-413e-477d-8e09-2c38ae57e582",
"visProtocol": "`{\"type\":\"leav3\",\"pixelmap\":\"${data.join(',')}\"}`",
"modes": {
"preprocessing": {
"inputs": {
"my_wsi": {
"\_layer_loc": "background",
"lossless": false,
"protocol": "`{\"type\":\"leav3\",\"slide\":\"${data}\"}`"
}
},
"outputs": {
"probability_mask": {
"\_layer_loc": "shader",
"name": "Cancer prediction",
"type": "heatmap",
"visible": 1,
"params": {
"opacity": 0.5,
}
},
"background_mask": {
"\_layer_loc": "shader",
"name": "Mask",
"type": "heatmap",
"visible": 1,
"params": {
"threshold": 0.5,
"use_mode": "mask_clip",
}
},
}
}
}
}
await root.rationai.globalStorage.jobConfig.createJobConfig("4e485b74-413e-477d-8e09-2c38ae57e582", jobEAD); _/
