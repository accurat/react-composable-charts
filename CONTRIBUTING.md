# How to Contribute

1. Clone this repository:

```sh
git clone https://github.com/accurat/react-composable-charts
cd react-composable-charts
```

2. Install `yarn` (https://yarnpkg.com/en/docs/install)

# Develop

You can use the `example` folder to immediately experiment with the lib.

1. Go to example folder and install dependencies:

```sh
cd example
yarn install
```

2. Edit `example/index.tsx`, importing the library from `../src`

## With other projects

If you want to develop new features and see them in a separated project, you can [link](https://classic.yarnpkg.com/en/docs/cli/link) the lib to your project.

```sh
// Inside react-composabe-charts
yarn link

// Inside your awesome project
yarn link react-composable-charts
```

since react-composable-charts uses hooks, react should be linked too

```sh
// Inside react-composabe-charts
cd node_modules/react
yarn link
cd ../react-dom
yarn link

// Inside your awesome project
yarn link react
yarn link react-dom
```

When you are done, unlink the packages:

```sh
// Inside react-composabe-charts
yarn unlink
cd node_modules/react
yarn unlink
cd ../react-dom
yarn unlink

// Inside your awesome project
yarn unlink react-composable-charts
yarn unlink react
yarn unlink react-dom
yarn install
```

# Publishing

We use [`np`](https://github.com/sindresorhus/np) to publish.

```sh
yarn release
```

If you want to release a beta version use:

```sh
yarn release --tag=beta
```
