import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#4FAD53',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    position: 'absolute',
    bottom: 40,              // 距离底部 40px
    alignSelf: 'center',     // 居中
    width: 200,
    borderRadius: 8,
    backgroundColor: '#ffffff',
  },

  buttonLabel: {
    color: '#4FAD53',        // 绿色字体
    fontWeight: 'bold',
    fontSize: 16,
  },

  buttonContent: {
    paddingVertical: 6,
  },
});
