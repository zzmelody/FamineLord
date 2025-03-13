// @ts-nocheck
const path = require('path');
const webpack = require('webpack');
const workspace = path.resolve(__dirname);
const fs = require('fs');
const scriptDir = path.join(workspace, 'Script');
const outputDir = path.join(workspace, 'Content/JavaScript');

/** 忽略编辑的第三方库 */
const externals = {
	ue: "ue",
	puerts: "puerts",
	path: "path",
	fs: "fs",
};

// const entries = {
// 	// 'source-map-support': {
// 	// 	input: 'src/addons/source-map-support.unity.js',
// 	// 	path: 'Content/JavaScripts',
// 	// 	filename: 'source-map-support.js'
// 	// },
// 	bundle: {
// 		input: 'Script/QuickStart.ts',
// 		path: 'Content/JavaScripts',
// 		filename: 'bundle.js'
// 	},
// 	test: {
// 		input: 'Script/index.ts',
// 		path: 'Content/JavaScripts',
// 		filename: 'bundle.js'
// 	},
// };

const entries = {};

(function (){
    function travel(dir,callback){
        fs.readdirSync(dir).forEach((file)=>{
            var pathname=path.join(dir,file)
            if(fs.statSync(pathname).isDirectory()){
                travel(pathname,callback)
            }else if(pathname.endsWith('.ts') && file.startsWith('TS_')){
                callback(pathname)
            }
        })
    }

    travel(scriptDir, pathname=>{
        const relativePathNameWithSuffix = pathname.substr(scriptDir.length);
        const relativePathNameWithoutSuffix = relativePathNameWithSuffix.substr(0, relativePathNameWithSuffix.length - 3);
        entries[relativePathNameWithoutSuffix] = pathname;
    });
})()

/** 生成版本信息 */
class HashGeneratorPlugin {
	constructor(options) {
		this.options = options;
	}

	apply(compiler) {
		compiler.hooks.afterEmit.tap("HashGenerator", (compilation) => {
			fs.writeFileSync(this.options.output, JSON.stringify({ hash: compilation.fullHash, time: Date.now() }, undefined, '\t'), 'utf-8');
		});
	}
}

module.exports = (env) => {
	if (!env) {
		env = {
			production: false,
			analyze: false,
			target: 'ESNext',
			esbuild: false,
			entry: 'bundle'
		};
	}
	env.production = JSON.parse(env.production || 'false');
	env.analyze = JSON.parse(env.analyze || 'false');
	env.esbuild = JSON.parse(env.esbuild || 'false');
	env.entry = env.entry || 'bundle';
	env.target = env.target || 'ESNext';
	console.log("Compile config:", env);


	const tsConfigFile = path.join(workspace, 'tsconfig.json');
	if (env.target) {
		const tsconfig = JSON.parse(fs.readFileSync(tsConfigFile).toString('utf-8'));
		tsconfig.compilerOptions.target = env.target;
		fs.writeFileSync(tsConfigFile, JSON.stringify(tsconfig, undefined, '\t'));
	}

	return ({
		entry: entries, //[path.join(workspace, entries[env.entry].input)],
		target: 'node',
		output: {
			path: outputDir, //path.join(workspace, entries[env.entry].path),
			filename: (pathData) => {
                return '[name].js';
            },
			library: {
				type: 'commonjs2'
			},
			clean: false,
		},
		module: {
			rules: [
				{ test: /\.(md|txt|glsl)$/, use: "raw-loader" },
				{ test: /\.ya?ml$/, type: 'json', use: 'yaml-loader' },
				(env.esbuild ? { // ESBuild 构建
					test: /\.(jsx?|tsx?)$/,
					loader: 'esbuild-loader',
					exclude: /(node_modules|bower_components)/,
					options: { loader: 'tsx' }
				}
					// ts-loader 构建
					: { test: /\.tsx?$/, use: 'ts-loader', exclude: /node_modules/ }
				),
			]
		},
		plugins: [
			//new HashGeneratorPlugin({ output: path.join(entries.bundle.path, 'version.json') }),
			env.production ? new webpack.DefinePlugin({}) : new (require('webpackbar'))(),
			env.analyze ? new (require('webpack-bundle-analyzer')).BundleAnalyzerPlugin() : new webpack.DefinePlugin({}),
			env.circularDetect ? new (require('circular-dependency-plugin'))(require('../tools/circular-dependency')) : new webpack.DefinePlugin({}),
			// 相当于 C++ 的宏定义，键名会被替换为值的字符串
			new webpack.DefinePlugin({
				PRODUCTION: JSON.stringify(env.production == true)
			}),
			// ESBuild 不会自动检查TS语法，这里添加相关插件
			//env.esbuild ? new (require('fork-ts-checker-webpack-plugin'))() : new webpack.DefinePlugin({}),
			new webpack.ProvidePlugin({ Buffer: ['buffer', 'Buffer'] }),
			new webpack.SourceMapDevToolPlugin({
				noSources: !env.production,
				sourceRoot: workspace,
				//filename: env.production ? `${entries[env.entry].filename}.map` : undefined
			}),
		],
		//devtool: false,
		resolve: {
			extensions: ['.tsx', '.ts', '.js', 'glsl', 'md', 'txt'],
			plugins: [
				new (require('tsconfig-paths-webpack-plugin'))({ configFile: tsConfigFile }),
			],
			fallback: {
				buffer: require.resolve('buffer'),
			},
		},
		optimization: {
			//runtimeChunk: 'single',
			splitChunks: {
				chunks: 'all'
			}
		},
		devtool: env.production ? "source-map" : "inline-nosources-cheap-module-source-map",
		mode: env.production ? "production" : "development",
		externals,
	});
};