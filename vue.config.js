module.exports = {
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': 'rgb(250, 200, 0)',
            'info-color': 'rgb(0, 170, 240)',
            'success-color': 'rgb(125, 198, 40)',
            'processing-color': 'rgb(0, 170, 240)',
            'error-color': 'rgb(240, 85, 60)',
            'highlight-color': 'rgb(240, 85, 60)',
            'warning-color': 'rgb(250, 200, 0)',
            'normal-color': 'rgb(75, 75, 75)',
            'white': 'rgb(255, 255, 255)',
            'black': 'rgb(20, 20, 20)',
          },
          javascriptEnabled: true,
        },
      },
    },
  },
};
