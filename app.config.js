export default {
  expo: {
    name: 'diary-companion',
    slug: 'diary-companion',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'diary-companion',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#00babc'
    },
    android: {
      package: 'com.krivtsoff.diary.companion42',
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#00babc'
      },
      googleServicesFile: process.env.GOOGLE_SERVICES_FILE
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png'
    },
    plugins: ['expo-router', '@react-native-google-signin/google-signin'],
    experiments: {
      typedRoutes: true
    },
    extra: {
      router: {
        origin: false
      },
      eas: {
        projectId: '4413a3cc-65ad-429b-8fb2-79e80c681e54'
      }
    },
    owner: 'jesuisstan'
  }
};
