



module.exports = {

    css: {
        loaderOptions: {
            scss: {
                prependData: `
					@import "@/style/gobal.scss";
        `
            }
        }
    },

}