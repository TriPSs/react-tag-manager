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
$ yarn add react-tag-manager
```

## Examples
Enabling and loading the Google Tag Manager
```Javascript
import GTM from 'react-tag-manager'

export const AppContainer = () => (
  <div>
    <GTM 
      gtm={{
        id: 'GTM-12345',
        auth: '',      // Optional
        preview: '',   // Optional 
      }} 
      settings={{
        sendPageView: true,     // default false
        pageView: {             // default null
          event: 'pageview',    // default
          data : {},            // default
          
          settings: { 
            locationProp: 'pathname', // default
            sendAs      : 'url',      // default
          },
        }
      }}>
    	...
    </GTM>
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
        
    <DataLayer 
      foo={'bar'}
      settings={{
        passProps: true, 	// default false, will pas all the given props to the child components
        withGTM: true, 		// default false, will add GTM to the child components
      }}>
      ...
    </DataLayer>

    ...
  </div>
)
```

### Trigger a event
```Javascript
import React from 'react'
import { withGTM } from 'react-tag-manager'

@withGTM
export default class extends from React.Component {

  handleButtonClick = () => {
    const { GTM } = this.props
    
    GTM.api.trigger({
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

### Trigger a pageview event
```Javascript
import React from 'react'
import { PageView } from 'react-tag-manager'

export default class extends from React.Component {

  render() {
    return (
      <div>
      	<PageView />
        ...
      </div>
    )
  }
  
}
```

### Trigger a onClick event
```Javascript
import React from 'react'
import { Click } from 'react-tag-manager'

export default class extends from React.Component {

  render() {
    return (
      <div>
      	<Click
      	  event={'click'}
      	  data={{
      	    event: 'click',
      		...
      	  }}>
      	  <button>CLICK ME</button>
      	</Click>
        ...
      </div>
    )
  }
  
}
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
You can use `npm link` / `yarn link` to use your development version in your own project:
- Go to `react-tag-manager` directory and execute command `npm link` / `yarn link`
- Go to your project directory and execute command `npm link react-tag-manager` / `yarn link react-tag-manager`

## [License](https://github.com/TriPSs/react-tag-manager/blob/master/LICENSE)

React Tag Manager is [MIT licensed](./LICENSE).

## Collaboration

If you have questions or [issues](https://github.com/TriPSs/react-tag-manager/issues), please [open an issue](https://github.com/TriPSs/react-tag-manager/issues/new)!
