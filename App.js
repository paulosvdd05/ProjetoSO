import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const initialState = {
  tipo: 'CPU-Bound',
  iniciado: false,
}

export default class App extends React.Component {

  state = { ...initialState }

  render = () => {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.titulo, { fontSize: 30 }]}>Simulador</Text>
          <Text style={{ textAlign: 'center' }}>Paulo Sergio Dias</Text>
          <Text style={{ textAlign: 'center' }}>Gianlucca Paschetta</Text>

          <TouchableOpacity onPress={() => this.state.iniciado ? this.setState({ iniciado: false}) :this.setState({ iniciado: true}) }>
            <View style={[styles.buttonIniciar, this.state.iniciado ? {backgroundColor: '#FF4B4B'} : null]}>
              {this.state.iniciado ? <AntDesign name="pause" size={24} color="white" /> : <AntDesign name="caretright" size={24} color="white" />}
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.simulador}>
          <View style={{ flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => this.setState({ tipo: 'CPU-Bound' })}>
              <View style={[styles.button, this.state.tipo == 'CPU-Bound' ? { backgroundColor: '#aaf' } : null]}>
                <Text style={styles.textButton}>CPU-Bound</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.setState({ tipo: 'I/O Bound' })}>
              <View style={[styles.button, this.state.tipo == 'I/O Bound' ? { backgroundColor: '#aaf' } : null]}>
                <Text style={styles.textButton}>I/O Bound</Text>
              </View>
            </TouchableOpacity>

          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.titulo}>Espera</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.titulo}>Pronto</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.titulo}>Execução</Text>
          </View>
        </View>


      </SafeAreaView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 25,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
  simulador: {
    flex: 4,
    width: '90%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
  },
  button: {
    matgintTop: 10,
    width: 200,
    height: 50,
    backgroundColor: '#e1e1e1',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
  },
  textButton: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  buttonIniciar: {
    marginVertical: 10,
    width: 50,
    height: 50,
    backgroundColor: '#0FFF3C',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    elevation: 10,
    shadowColor: '#000',
  }
});
