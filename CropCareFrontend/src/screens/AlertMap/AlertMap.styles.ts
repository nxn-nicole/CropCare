import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
      flex: 1,
    },
    content: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    error: {
      color: 'red',
      fontSize: 16,
      textAlign: 'center',
      marginTop: 20,
    },
loadingContainer: {
  flex: 1,              // 占满整个屏幕
  justifyContent: 'center',  // 垂直居中
  alignItems: 'center',      // 水平居中
},
loadingText:{
    color: '#4FAD53',
        fontWeight: 'bold',
        fontSize: 15,
    }
});
