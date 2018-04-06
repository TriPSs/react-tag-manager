import { canUseDom } from './helpers'

export const loadScript = ({ id, auth, preview }, dataLayerName, loadCallback) => {
  const script = document.createElement('SCRIPT')

  let src = `https://www.googletagmanager.com/gtm.js?id=${id}`
  if (auth) {
    src += `&gtm_auth=${auth}`
  }

  if (preview) {
    src += `&gtm_preview=${preview}`
  }

  script.async = true
  script.src = src

  script.onload = () => {
    window[dataLayerName].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })

    loadCallback()
  }

  script.onerror = () => {
    throw new Error('Google Tag Manager could not be loaded.')
  }

  document.head.appendChild(script)
}

export const loadNoScript = (gtmID) => {
  document.body.appendChild(`<iframe src="//www.googletagmanager.com/ns.html?id=${gtmID}"
        height="0" width="0" style="display:none;visibility:hidden" id="tag-manager"></iframe>`)
}

export default (gtm, dataLayerName, loadCallback) => {
  // Check if we can use the dom just to be sure
  if (canUseDom()) {
    loadScript(gtm, dataLayerName, loadCallback)
  }
}
