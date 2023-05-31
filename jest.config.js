module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    modulePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/movie-search-app/"],
    moduleNameMapper: {
        '^axios$': require.resolve('axios'),
    },
};