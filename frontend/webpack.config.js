module.exports = {
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    module: {
        loaders: [
            // Typescript
            { test: /\.tsx?$/, loader: "ts-loader" },
        ],
    },
};
