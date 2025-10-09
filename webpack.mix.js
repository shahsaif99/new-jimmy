const mix = require('laravel-mix')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
    .js('resources/js/app.js', 'public/js')
    .webpackConfig({
        resolve: {
            extensions: ['.js', '.vue'],
            alias: {
                '@': path.resolve(__dirname, 'resources/js/src/'),
                '~': path.resolve(__dirname, 'resources/js/'),
                '@themeConfig': path.resolve(__dirname, 'resources/js/themeConfig.js'),
                '@core': path.resolve(__dirname, 'resources/js/src/@core'),
                '@validations': path.resolve(__dirname, 'resources/js/src/@core/utils/validations/validations.js'),
                '@axios': path.resolve(__dirname, 'resources/js/src/libs/axios'),
                ziggy: path.resolve('vendor/tightenco/ziggy/src/js/route.js'),
            }
        },
        module: {
            rules: [{
                    test: /\.s[ac]ss$/i,
                    use: [{
                        loader: 'sass-loader',
                        options: {
                            sassOptions: {
                                includePaths: ['node_modules', 'resources/js/src/assets']
                            }
                        }
                    }]
                },
                {
                    test: /(\.(png|jpe?g|gif|webp)$|^((?!font).)*\.svg$)/,
                    loaders: {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            context: 'resources/js/src/assets',
                        }
                    }
                }
            ]
        },
        output: {
            chunkFilename: 'js/chunks/[name].js'
        }
    })
    .sass('resources/scss/app.scss', 'public/css')
    .options({
        postCss: [require('autoprefixer'), require('postcss-rtl')]
    })
mix.copy('resources/scss/loader.css', 'public/css')
mix.copyDirectory('resources/js/src/assets/images', 'public/images')
if (mix.inProduction()) {
    mix.version()
}


mix.setPublicPath('public')