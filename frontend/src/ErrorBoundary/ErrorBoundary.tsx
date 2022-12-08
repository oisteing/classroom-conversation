import React from 'react'
import { Trans } from 'react-i18next';


class ErrorBoundary extends React.Component {

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo)
  }

  render() {
    
    // @ts-ignore
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <Trans i18nKey='error.unexpected'>
            <h1>En feil oppsto.</h1>
          </Trans>
        </>
      )
    }

    // @ts-ignore
    return this.props.children; 
  }
}

export default ErrorBoundary
