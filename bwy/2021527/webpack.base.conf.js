var webpack = require('webpack');
plugins: [
    new webpack.ProvidePlugin({
    jQuery: 'jquery',
    $: 'jquery',
    'window.jQuery': 'jquery'
    })
    ]