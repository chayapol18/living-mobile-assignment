
module.exports = {
    devServer: {
		open: process.platform === 'darwin',
		host: process.env.DEV_URL, // can share on area network
		port: process.env.PORT,
		https: false,
		hotOnly: false,
		proxy: null, // string | Object
		overlay: {
		  warnings: true,
		  errors: true
		}
      }
};
