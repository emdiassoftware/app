import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'emdiasapp.premium.app',
  appName: 'Emdias',
  webDir: 'www',
  plugins: {
    SplashScreen:{
      launchShowDuration: 2000,
      backgroundColor:'white',
      showSpinner: false,
      androidSpinnerStyle:"small",
      iosSpinnerStyle:'small',
      splashFullScreen:true,
      splashImmersive:true
    },
    CapacitorSQLite: {
      sync: true
    }
  },
  server: {
    androidScheme: 'https'
  }
};

export default config;
