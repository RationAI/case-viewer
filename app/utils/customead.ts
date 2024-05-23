/* const uploadCustomEAD = async () => {
  await rootApi.rationai.globalStorage.jobConfig.deleteJobConfig(
    '4e485b74-413e-477d-8e09-2c38ae57e582',
  );
  await rootApi.rationai.globalStorage.jobConfig.deleteJobConfig(
    '4e485b74-413e-477d-8e09-2c38ae57e582',
  );
  await rootApi.rationai.globalStorage.jobConfig.deleteJobConfig(
    '4e485b74-413e-477d-8e09-2c38ae57e582',
  );
  const jobEAD = {
    name: 'Prostate job',
    description: 'This is a description of prostate job',
    appId: '4e485b74-413e-477d-8e09-2c38ae57e582',
    modes: {
      preprocessing: {
        inputs: {
          my_wsi: {
            _layer_loc: 'background',
            lossless: false,
          },
        },
        outputs: {
          probability_mask: {
            _layer_loc: 'shader',
            name: 'Cancer prediction',
            type: 'heatmap',
            visible: 1,
            params: {
              opacity: 0.5,
            },
          },
          background_mask: {
            _layer_loc: 'shader',
            name: 'Mask',
            type: 'heatmap',
            visible: 1,
            params: {
              threshold: 0.5,
              use_mode: 'mask_clip',
            },
          },
        },
      },
    },
  };
  await rootApi.rationai.globalStorage.jobConfig.createJobConfig(
    '4e485b74-413e-477d-8e09-2c38ae57e582',
    jobEAD,
  );
}; */
