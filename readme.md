<p align="center">
  <a href="https://www.npmjs.com/package/react-tag-manager">
    <img alt="Google Tag Manager" src="https://daks2k3a4ib2z.cloudfront.net/591c03efc7fff47e9216373a/591c03efc7fff47e9216377b_%5Badaptive%5Dlogo-tag-manager-min.png" width="400">
  </a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/react-tag-manager" title="downloads"><img src="https://img.shields.io/npm/v/react-tag-manager.svg?maxAge=2592000&style=flat-square"/></a>
  <a href="https://npm-stat.com/charts.html?package=react-tag-manager" title="downloads"><img src="https://img.shields.io/npm/dt/react-tag-manager.svg?maxAge=2592000&style=flat-square"/></a>   
  <a href="https://david-dm.org/tripss/react-tag-manager" title="dependencies status"><img src="https://david-dm.org/tripss/react-tag-manager/status.svg?style=flat-square"/></a>
  <a href="https://david-dm.org/tripss/react-tag-manager?type=dev" title="devDependencies status"><img src="https://david-dm.org/tripss/react-tag-manager/dev-status.svg?style=flat-square"/></a>
</p>

---

## Installation
```shell
$ npm install --save react-tag-manager
```

## Development
If you'd like to contribute to this project, all you need to do is clone
this project and run:

```shell
$ npm install
$ npm run build
$ npm run build:watch // To recompile files on file change
```

### Using development version in local project
You can use `npm link` to use your development version in your own project:
- Go to `react-tag-manager` directory and execute command `npm link`
- Go to your project directory and execute command `npm link react-tag-manager`

## Examples
Enabling and loading the Google Tag Manager
```Javascript
import GTM from 'react-tag-manager'

export const AppContainer = () => (
  <div>
    <GTM 
      gtm={{
        id: 'GTM-12345',
        auth: '', // Optional
        preview: '', // Optional 
      }} 
      pageviewEvent={'pageview'} // 'pageview' is default
      dataLayerName={'dataLayer'} // 'dataLayer' is default
    />

    ...
  </div>
)
```

### Updating / Adding data to the data layer
```Javascript
import DataLayer from 'react-tag-manager/DataLayer'

export const Component = () => (
  <div>
    // All props will be added to the data layer
    <DataLayer 
      foo={'bar'}
    />

    ...
  </div>
)
```

### Triger a event
```Javascript
import React from 'react'
import api from 'react-tag-manager/api'

export default class extends from React.Component {

  handleButtonClick = () => {
    api.trigger({
      event: 'my-button-click',
      bar: 'foo'
    })
  }
  
  render() {
    return (
      <div>
        <button onClick={this.handleButtonClick} />
      </div>
    )
  }
  
}
```
