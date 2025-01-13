declare module 'particles.js' {
    const particlesJS: any;
    export default particlesJS;
  }
  
// Add particlesJS to the global window object
declare global {
    interface Window {
      particlesJS: any;
    }
  }
  
  export {};