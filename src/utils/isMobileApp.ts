export const isMobileApp = ()=>{
    const userAgent = navigator.userAgent || navigator.vendor
    const appIndicators = ['wv', 'Mobile', 'Android', 'iOS']
    const browserIndicators = ["Chrome", "Safari", "Firefox", "Edge", "Opera"]

    const hasAppIndicators = appIndicators.some(indicator => userAgent.includes(indicator))
    const hasBrowserIndicators = browserIndicators.some(indicator => userAgent.includes(indicator))

    return hasAppIndicators && !hasBrowserIndicators
}